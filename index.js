const { Client, Intents, MessageEmbed, Collection, ApplicationCommand, } = require("discord.js")
const { Prefix } = require("./config.json")
const fs = require("node:fs")
const levelFile = require("./data/levels.json")
const woordenScheld = require("./data/woorden.json")
const woordenScheldtop = require("./data/kickwoorden.json")

var errorembed = new MessageEmbed()
errorembed.setTitle("error")
errorembed.setDescription("Error")

require("colors")
require("dotenv").config


const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})


client.commands = new Collection();



const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.help.name, command);
    console.log(`Command: ${command.help.name}, (${command.help.catogory})`.green)
    console.log(`Desc: ${command.help.description}`.green)
    if (command.help.aliases === 2) console.log(comamnd.help.aliases)
    console.log("-".repeat("36"))
}



client.once("ready", () => {
    console.log("Online".green)
    client.user.setActivity("Tilburg", { type: "LISTENING" })
})


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on("messageCreate", async message => {


    if (message.author.bot) return

    var messagearray = message.content.split(" ")

    var command = messagearray[0]

    


    if(!message.content.startsWith(Prefix)) {
        return
    }
    const commandData = client.commands.get(command.slice(Prefix.length))

    if(!commandData) return


    var arguments = messagearray.slice(1)

    try {
        await commandData.run(client, message, arguments)
    } catch (error) {
        console.log(error)
        await message.channel.send({embeds: [errorembed]})
    }


})
client.login("OTUyNjc5NzM0NTc4MzgwODIw.Yi5iJA.qxtmJIJ4mqwYybnDJEyIB2yStDw")





