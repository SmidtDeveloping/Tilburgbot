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

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.help.name, command);
        console.log(`Command: ${command.help.name} ✔`.green)
}

client.once("ready", () => {
const status0ptions [
    "Hallo",
    *TEST",
     JEEEEEEJ"
	]
	
let counter 0;
// let time = 1 60 1000; // 1 Minuut.
let time = 5 1000;
const updatestatus () -> (
    client.user.setPresence((
        status: "online",
        activities: [
                 name: statusoptions[counter]
    );
})


client.once("messageCreate", async message => {


    if (message.author.bot) return

    var prefix = config.prefix

    


    var messagearray = message.content.split(" ")

    var command = messagearray[0]
    
    




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
