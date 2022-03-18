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

const commandFiles = fs.readdirsync("./commands").filter(file => file.endsWith(".js")) 

for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.help.name, command);
        console.log(`Command: ${command.help.name} ✔ (${command.help.catogory}) {`.green)
        console.log(`${command.help.description} }`.blue)
}

    const command = require(`./commands/${file}`)

    client.commands.set(command.help.name, command)
    console.log(`Command: ${command.help.name} (${command.help.catogory})`)




client.once("ready", () => {
console.log(`${client.user.username}`.green);
})


client.once("messageCreate", async message => {



    if(message.author.bot) return

    var prefix = config.prefix
     
    var messagearray = message.content.split(" ")

    var command = messagearray[0]

     if(!message.content.startWit(prefix)) return


     var commanddata = client.commands.get(command.slice(prefix.lenght))


    if(!commanddata) return

    var arguments = messagearray.slice(1)

    try {
        await commanddata.run(client, message, arguments)
    } catch (error) {
        console.error(error)
        await message.reply("Er Was een fout tijdens dit commando")
    }
})

client.login(process.env.token)
