const  discord = require("discord.js")
const fs = require("fs")
const Perms = require("permissions")
const file = require("../data/woorden.json")
module.exports.run  = async (client, message, args) => {
    const member = message.member
    const channel = message.channel

    if (!member.permissions.has("KICK_MEMBERS")) return message.reply("jij kan dit niet doen. ");

    if(args[1] ) return channel.send("Geef een vloekwoord op")

    var word = args[1]

    const scheldwoordenJSON = fs.readFileSync(file, 'utf-8')
    const scheldwoorden = JSON.parse(scheldwoordenJSON)

    scheldwoorden.push(word)

    scheldwoordenJSON = JSON.stringify(scheldwoorden)
    fs.writeFileSync(file, scheldwoordenJSON, "utf-8")
    

    return channel.send(`je mag niet meer schelden met ${word}`)

}

module.exports.help = {
 name: "scheld",  
 catogory: "mod",
 description: "Geeft je informatie",
 aliases: []
}