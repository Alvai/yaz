// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Cherche de nouvelles blagues`);
});

const flipCoin = () => Math.floor(Math.random() * 2);
client.on("messageReactionAdd", (messageReaction, user) => {
  if(messageReaction.emoji.toString() == '👆') {
    const NOTIFY_CHANNEL = client.channels.get(messageReaction.message.channel.id);
    let date = new Date().toISOString();
    NOTIFY_CHANNEL.send({embed: {
      color: 3447003,
      author: {
        name: messageReaction.message.author.username,
        icon_url: messageReaction.message.author.avatarURL,
      },
      title: `Posted at ${messageReaction.message.createdAt} in ${messageReaction.message.channel.name}`,
      description: messageReaction.message.content,
      timestamp: date,
      footer: {
        icon_url: user.avatarURL,
        text: `${user.username} Quoted this message`
      }
    }});
  messageReaction.remove(user.id);
}
});
client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  if(flipCoin() === 0) return;
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const ar = args;
  // Let's go with a few common example commands! Feel free to delete or change those.
  if(message.content.toLowerCase().includes('cc')){
    const a = await message.channel.send(`salut ${message.author.username} :) `);
  }
  if(message.content.toLowerCase().includes("zya") 
    || message.content.toLowerCase().includes("zyo")) {
    const a = await message.channel.send("STOP BULLY ME");
  }
  if(message.content.toLowerCase().includes("stage")) {
    const b = await message.channel.send("Actuellement sans emploi...");
  }
  if(message.content.toLowerCase().includes("sophie") 
    || message.content.toLowerCase().includes("matthieu")
    || message.content.toLowerCase().includes("neil")) {
    const c = await message.channel.send("Ne prononce plus jamais ce nom.");
  }
});
const token = process.env.token || null;
client.login(token);
