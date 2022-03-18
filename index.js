const { Client, Intents, MessageEmbed } = require("discord.js")
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
botembed.setTitle(`Botinfo voor ${bot.user.username}`)
botembed.setColor("RANDOM")
botembed.setFields(
    {name: "naam:", value: bot.user.username},
    {name: "id", value: bot.user.id},
)



    message.channel.send({embeds: [embed, botembed]})
        }
 })

client.login(process.env.token)