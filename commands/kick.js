const discord = require("discord.js")
module.exports.run = async (client, message, args) => {


    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Je hebt geen perms")


    if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("De bot heeft geen perms om dit te doen!");

    if (!args[0]) return message.reply("Geen naam gevonden in je bericht")

    if (!args[1]) return message.reply("Geen reden gevonden in je bericht")


    var kickuser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    if (!kickuser) return message.reply("Persoon zit niet meer in de server")


    var reden = args.slice(1).join(" ")

    kickuser.kick(reden).catch(err => {
        if (err) return message.channel.send("Foutje!")
    })
    
message.reply(`${kickuser} is gekickt`)

}

module.exports.help = {
    name: "kick",
    catogory: "mod",
    description: "Kicked een persoon",
    aliases: []
}