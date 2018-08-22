setInterval(function() {
    const NOTIFY_CHANNEL = client.channels.get('448548973654048770');
    if (typeof NOTIFY_CHANNEL !== 'undefined') {
      NOTIFY_CHANNEL.fetchMessages({ limit: 100 })
      .then(messages => {
        messagesArray = messages.array();
        selectedMessage = messagesArray[Math.floor(Math.random()*messagesArray.length)];
        if(selectedMessage.author.bot) return;
        if(selectedMessage.content.length < 10) return;
        NOTIFY_CHANNEL.send('ouch !');
        NOTIFY_CHANNEL.send({embed: {
          color: 3447003,
          author: {
            name: selectedMessage.author.username,
            icon_url: selectedMessage.author.avatarURL
          },
          description: selectedMessage.content,
          timestamp: selectedMessage.createdAt,
          footer: {
            icon_url: client.user.avatarURL,
            text: "Made in Bangladesh"
          }
        }
        });
      })
      .catch((error) => console.log(error));
    }
  }, 60 * 10000); // Check every 5 minutes