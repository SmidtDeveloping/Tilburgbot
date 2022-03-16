const { MessageEmbed } = require("discord.js")
module.exports.run  = async (bot, message, args) => {
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

module.exports.help = {
 name: "info",  
 catogory: "Info",
 description: "Geeft je informatie"
}