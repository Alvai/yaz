YAZ BOT FOR DISCORD 
-------------------
[![Known Vulnerabilities](https://snyk.io/test/github/IvanMiIosevic/Yaz/badge.svg?targetFile=package.json)](https://snyk.io/test/github/IvanMiIosevic/Yaz?targetFile=package.json)
[![Build Status](https://travis-ci.org/IvanMiIosevic/Yaz.svg?branch=master)](https://travis-ci.org/IvanMiIosevic/Yaz)

# Install

```cli
npm install
```

open app.js and the template AFTER THE LAST IF

```js

  if(message.content.includes("WHAT YOU WANT TO SAY")) {
    const m = await message.channel.send("WHAT THE BOT IS GOING TO SAY");
  }

```
## Before Commit 

run 
```cli
npm run lint
```
