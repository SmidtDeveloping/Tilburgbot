const discord = require("discord.js")
module.exports.run  = async (bot, message, args) => {


if (!message.member.permissions.has("MANAGE_MESSAGE")) return essage.reply("Je hebt geen toestemming. ");


if(!args[0]) return message.reply("Geef een aantaal mee")

if(parseInt(args[0])) {


var amount = parseInt(args[0]) + 1

message.channel.bulkDelete(amount).then(() => {

    if(parseInt(args[0]) == 1) {
        message.channel.send("Ik heb 1 bericht verwijderd").then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 3000 )
        })
    } else {
        message.channel.send(`Ik heb ${parseInt(args[0])} berichten verwijderd`).then(msg => {
            setTimeout(() => {
                msg.delete()

            }, 3000)
        })
    }

}).catch(err => {
return message.channel.send("Geef een gatal hoger dan 0 op")
})

}else {
    return message.channel.send("Geef een gtal op")
}
 
}



module.exports.help = {
 name: "clear",  
 catogory: "mod",
 description: "Clear command",
 aliases: []
}