const discord = require("discord.js")
module.exports.run  = async (bot, message, args) => {


    if (Imessage.member.permissions.has("KICK_MEMBERS")) return message.reply("Sorry jij kan die niet doen. ");
    await message.channel.permissionOverwrites.set([
         {
              id: message.guild.roles.cache.find(r => r.name ===   "@everyone").id,
              deny: ["SEND_MESSAGES"]
                                                                                  
         }]);
         
    return message.channel.send( "Kanaal in lockdown.");

}

module.exports.help = {
 name: "lockdown",  
 catogory: "mod",
 description: "lockdown een kanaal",
 aliases: []
}