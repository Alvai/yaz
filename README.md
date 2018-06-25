YAZ BOT FOR DISCORD 
-------------------
[![Build Status](https://travis-ci.org/IvanMiIosevic/Yaz.svg?branch=master)](https://travis-ci.org/IvanMiIosevic/Yaz)

# install

```cli
npm install
```

open app.js and the template AFTER THE LAST IF

```js

  if(message.content.includes("WHAT YOU WANT TO SAY")) {
    const m = await message.channel.send("WHAT THE BOT IS GOING TO SAY");
  }

```
