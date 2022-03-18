const { Client, Intents, MessageEmbed, Collection } = require("discord.js")
const { Prefix } = require("./config.json")
const fs = require("node:fs")
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})


client.commands = new Collection();


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.help.name, command);
    console.log("-".repeat("36"))
    console.log(`Command: ${command.help.name}, (${command.help.catogory})`)
    console.log(`Desc: ${command.help.description}`)
    console.log("-".repeat("36"))
}

client.once("ready", () => {
    console.log(Prefix);
    console.log(client.user.username);
    console.log(process.env.token)
    client.user.setActivity("Tilburg", {type: "PLAYING"})
})

client.on("messageCreate", message => {
    

    if (message.author.bot) return

    var messagearray = message.content.split(" ")

    var command = messagearray[0]

    if(command == `${Prefix}info`) {
        const embed = new MessageEmbed()
    embed.setTitle(`ServerInfo voor ${message.guild.name}`)
    embed.setColor("RANDOM")
    embed.setFields(
        {name: "Naam", value: message.guild.name},
        {name: "membercount", value: message.guild.memberCount.toString()},
        {name: "Roles", value: message.guild.roles.cache.size.toString()},
        {name: "Channels", value: message.guild.channels.cache.size.toString()},
        {name: "Id", value: message.guildId},
),
    embed.setThumbnail(message.guild.iconURL())

const botembed = new MessageEmbed()
botembed.setTitle(`Botinfo voor ${client.user.username}`)
botembed.setColor("RANDOM")
botembed.setFields(
    {name: "naam:", value: client.user.username},
    {name: "id", value: client.user.id},
)



    message.channel.send({embeds: [embed, botembed]})
        }





        if(command == `${Prefix}role`) {
            var member = message.guild.members.cache.get(message.mentions.users.first().id)
            if(!member) return message.reply("Geen gebruiker gevonden")

        }
 })

client.login(process.env.token)