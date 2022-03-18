const { Client, Intents, MessageEmbed, Collection } = require("discord.js")
require("colors")
const config = require("./config.json")
const fs = require("fs")
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})






client.once("ready", () => {
console.log(`${client.user.username}`.green);
console.log(config.prefix);
})


client.once("messageCreate", async message => {



    if(message.author.bot) return

    var prefix = config.prefix
     
    var messagearray = message.content.split(" ")

    var command = messagearray[0]

  if(command == `${prefix}info`) {
      return message.channel.send("JAAA")
  }
})

client.login(process.env.token)
