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






client.once("ready", () => {
console.log(`${client.user.username}`.green);
})


client.once("messageCreate", async message => {



    if(message.author.bot) return

    var prefix = config.prefix
     
    var messagearray = message.content.split(" ")

    var command = messagearray[0]

   if(command == `${prefix}info`) {
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
