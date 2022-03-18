const { Client, Intents } = require("discord.js")
const { Prefix } = require("./config.json")
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.once("ready", () => {
    console.log(Prefix);
    console.log(client.user.username);
})

client.on("messageCreate", message => {
    

    if (message.author.bot) return

    var messagearray = message.content.split(" ")

    var command = messagearray[0]

    if(command == `${Prefix}info`) {
        return message.channel.send("Test")
    }
 })

client.login(procces.env.token)