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

client.commands = new Collection()

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))

for (const file of commandFiles) {

    const command = require(`./commands/${file}`)

    client.commands.set(command.help.name, command)
    console.log(`Command: ${command.help.name} ✔`.green)
    
}

client.once("ready", () => {
    try {
        var g = client.guilds.cache.get("920356898665021482")
        console.log("Klaar")
        client.user.setActivity(`${g.name}`, {type: "WATCHING"},)
        
    } catch (error) {
        console.error(error)
    }
})


client.once("messageCreate", async message => {


    if (message.author.bot) return

    var prefix = config.prefix

    


    var messagearray = message.content.split(" ")

    var command = messagearray[0]
    
    
    if(command == `${prefix}ping` => {
       message.reply("pong")
       }

    if (!message.content.startsWith(prefix)) return


    const commanddata = client.commands.get(command.slice(prefix.length))

    if (!commanddata) return

    var arguments = messagearray.slice(1)


    try {

        await commanddata.run(client, message, arguments)

    } catch (error) {
        console.log(error)
    }





})

client.login(process.env.token)
