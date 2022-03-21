const discord = require("discord.js")
module.exports.run  = async (bot, message, args) => {


    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Sorry jij kan dit niet doen");

    await message.channel.send(".....")

    process.exit();
    
}

module.exports.help = {
 name: "herstart",  
 catogory: "mod",
 description: "Geeft je informatie",
 aliases: []
}