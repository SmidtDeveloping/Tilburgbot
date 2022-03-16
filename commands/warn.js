const  discord  = require("discord.js")
const fs = require("fs")
module.exports.run  = async (client, message, args) => {
  

    if (!message.member.permissions.has ("KICK_MEMBERS")) return message.reply("Sorry jij kan dit niet doen");


    if(!args[0]) return message.reply("Geen gebruiker meegegeven")
    if(!args[1]) return message.reply("Geen Reden meegegeven")
    var warnUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    var reden = args.slice(1).join(" ")

    if(!warnUser) return message.reply("Gebruiker Niet gevonden in de systemen")
const warns = JSON.parse(fs.readFileSync("./warns.json", "utf-8"))


if(!warns[warnUser.id]) warns[warnUser.id] = {
    warns: 0
}

warns[warnUser.id].warns++

var embed = new discord.MessageEmbed()
.setColor("#ff0000")
.setFooter(message.member.displayName, message.author.displayAvatarURL)
.setTimestamp()
.setDescription(`**Gewarnd:** ${warnUser.user.username} (${warnUser.id})
    **Warning door:** ${message.author}
    **Redenen: ** ${reason}`)
.addField("Aantal warns", warns[warnUser.id].warns.toString());



const channel = message.channel

channel.send({embeds: [embed]})


fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err);
});

}

module.exports.help = {
 name: "warn",  
 catogory: "Info",
 description: "Geeft je informatie"
}