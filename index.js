const { Client, Intents, MessageEmbed, Collection, ApplicationCommand, } = require("discord.js")
const { Prefix } = require("./config.json")
const fs = require("node:fs")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const levelFile = require("./data/levels.json")
const woordenScheld = require("./data/woorden.json")
const woordenScheldtop = require("./data/kickwoorden.json")

var errorembed = new MessageEmbed()
.setColor("RANDOM")
.setTitle('Er is een error opgetreden')
.setAuthor({ name: 'Command Error'})
.setDescription('Some description here')
.addFields(
    { name: 'Regular field title', value: 'Some value here' },
    { name: '\u200B', value: '\u200B' },
    { name: 'Inline field title', value: 'Some value here', inline: true },
    { name: 'Inline field title', value: 'Some value here', inline: true },
)
.addField('Inline field title', 'Some value here', true)
.setImage('https://i.imgur.com/AfFp7pu.png')
.setTimestamp()
.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

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

const commands = [];
const commandslashFiles = fs.readdirSync('./slashcommands').filter(file => file.endsWith('.js'));

client.commands = new Collection();
client.slashCommands = new Collection();

for (const file of commandFiles) {
	const command = require(`./slashcommands/${file}`);
	commands.push(command.data.toJSON());
}



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

const rest = new REST({ version: '9' }).setToken(process.env.token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.once("ready", () => {
    console.log("Online".green)
    client.user.setActivity("Tilburg", { type: "LISTENING" })






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

})

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
client.login(process.env.token)





