const discord = require("discord.js")
const config  = require("./config/cmdconfig.json")
const index = require("../index.js")
module.exports.run  = async (client, message, args) => {


    try {

        var prefix = "="

        var response = "**Bot Commands**\r\n\n"

    var general = "**__Algemeen__**\r\n"
    var Informatie = "**Informatie**\r\n"
    var Moderatie = "**__Moderatie__**\r\n"

client.commands.forEach(command => {
    

    switch (command.help.catogory) {

        case "general" :
            general += `${prefix}${command.help.name} - ${command.help.description}`
            break;

            case "Info":
                Informatie += `${prefix}${command.help.name} - ${command.help.description}`
            break
    
            case "Moderatie" : 
            Moderatie += `${prefix}${command.help.name} - ${command.help.description}`
            break
        

    }


});

response += general + Informatie + Moderatie

message.author.send(response).then(() => {
    return message.channel.send("help staat in je dm")
    message.author.send("Jehtoch")
}).catch(() => {
    return message.channel.send("Je prive berichten staan uit")
})




        
    } catch (error) {
        
    }
}

module.exports.help = {
 name: "status",  
 catogory: "Info",
 description: "Geeft je informatie",
 aliases: []
}