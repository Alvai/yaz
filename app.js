// Load up the discord.js library
const Discord = require('discord.js');
const moment = require('moment');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

moment.locale('fr');

let botData = [];

const checkIfExists = (message, command) => {
  if (command.words) {
    return command.words.some((v) => {
      console.log(command.mustBeEqual);
      if (command.mustBeEqual) {
        console.log('is it strickly equal : ', message.toLowerCase() === v);
        return message.toLowerCase() === v;
      }
      console.log('does it contains the word : ', message.indexOf(v) >= 0);
      return message.indexOf(v) >= 0;
    });
  }
  return false;
};
const getAnswer = (message) => {
  let res = '';
  for (let i = 0; i < botData.length; i += 1) {
    if (checkIfExists(message, botData[i])) {
      res = botData[i].response;
      break;
    } else {
      res = false;
    }
  }
  console.log('end of function ,res is : ', res);
  return res;
};

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const Yaz = new Discord.Client();

const isHeroku = () => {
  if (process.env.NODE && process.env.NODE.indexOf('heroku')) {
    return true;
  }
  return false;
};

Yaz.on('ready', async () => {
  await axios.get(process.env.API_URL)
    .then((res) => {
      botData = res.data;
    })
    .catch(() => {
      botData = [];
    });

  // Check if bot is run from heroku or not
  console.log(isHeroku());

  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${Yaz.users.size} users, in ${Yaz.channels.size} channels of ${Yaz.guilds.size} guilds.`);

  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  Yaz.user.setActivity('Getting some updates');
  console.log(botData);
});


Yaz.on('messageReactionAdd', (messageReaction, user) => {
  if (messageReaction.emoji.toString() === '👆') {
    const NOTIFY_CHANNEL = Yaz.channels.get(messageReaction.message.channel.id);
    const date = moment();
    NOTIFY_CHANNEL.send({
      embed: {
        color: 3447003,
        author: {
          name: messageReaction.message.author.username,
          icon_url: messageReaction.message.author.avatarURL,
        },
        title: `${moment(messageReaction.message.createdAt).fromNow()} dans #${messageReaction.message.channel.name}`,
        description: messageReaction.message.content,
        timestamp: date,
        footer: {
          icon_url: user.avatarURL,
          text: `${user.username} viens de citer ce message`,
        },
      },
    });
    messageReaction.remove(user.id);
  }
});
Yaz.on('message', async (message) => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // thi
  if (message.content === '!stop') {
    await Yaz.destroy().then(() => console.log('stopped'));
    return;
  }

  const response = getAnswer(message.content.toLowerCase());
  if (!response) {
    return;
  }
  await message.channel.send(response)
    .catch(e => console.log(e));
});

const token = process.env.TOKEN || null;
Yaz.login(token);
