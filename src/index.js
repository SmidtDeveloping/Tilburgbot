const { Client, Intents } = require("discord.js")
const config = require("./config.json")
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
})


client.once("ready", () => {
    try {
        console.log("Klaar")
    } catch (error) {
        console.error(error)
    }
})


client.once("messageCreate", message => {


if(message.author.bot) return

var prefix = config.prefix


var messagearray = message.content.split(" ")

var command = messagearray[0]

if(command == `${prefix}test`) [
    message.reply("ja wil je testen mijn maatje")
]


})

client.login(process.env.token)