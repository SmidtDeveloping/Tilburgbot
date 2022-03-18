const { Client, Intents, MessageEmbed, Collection } = require("discord.js")
const { Prefix } = require("./config.json")
const fs = require("node:fs")
require("dotenv").config
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})


client.commands = new Collection();
client.events = new Collection();
client.aliases = new Collection()


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.help.name, command);
    console.log("-".repeat("36"))
    console.log(`Command: ${command.help.name}, (${command.help.catogory})`.green)
    console.log(`Desc: ${command.help.description}`.green)
    console.log("-".repeat("36"))
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith(".js"))

for (const file of eventFiles) {
    const event = require(`./events/${file}`)

    client.events.set(event.help.name, event)
    console.log("-".repeat("36"))
    console.log(`Event: ${event.help.name}, (${event.help.catogory})`.red)
    console.log(`Desc: ${event.help.description}`.red)
    console.log("-".repeat("36"))

}



client.once("ready", () => {
    console.log("Online".green)
    client.user.setActivity("Tilburg", { type: "LISTENING" })


})

client.on("messageCreate", message => {


    if (message.author.bot) return

    var messagearray = message.content.split(" ")

    var command = messagearray[0]

    if (command == `${Prefix}info`) {
        const embed = new MessageEmbed()
        embed.setTitle(`ServerInfo voor ${message.guild.name}`)
        embed.setColor("RANDOM")
        embed.setFields(
            { name: "Naam", value: message.guild.name },
            { name: "membercount", value: message.guild.memberCount.toString() },
            { name: "Roles", value: message.guild.roles.cache.size.toString() },
            { name: "Channels", value: message.guild.channels.cache.size.toString() },
            { name: "Id", value: message.guildId },
        ),
            embed.setThumbnail(message.guild.iconURL())

        const botembed = new MessageEmbed()
        botembed.setTitle(`Botinfo voor ${client.user.username}`)
        botembed.setColor("RANDOM")
        botembed.setFields(
            { name: "naam:", value: client.user.username },
            { name: "id", value: client.user.id },
        )

        message.channel.send({ embeds: [embed, botembed] })
    }



    if (!message.content.startsWith(Prefix)) return









    if (command == `${Prefix}role`) {
        var member = message.guild.members.cache.get(message.mentions.users.first().id)
        if (!member) return message.reply("Geen gebruiker gevonden")

    }
})

client.login(process.env.token)



// client.login("")

