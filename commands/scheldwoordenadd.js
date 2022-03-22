const  discord = require("discord.js")
const fs = require("fs")
const Perms = require("permissions")
const file = require("../data/woorden.json")
module.exports.run  = async (client, message, args) => {
 
    if (!message.member.permissions.has("KICK_MEPBERS")) return message.reply("jij kan dit niet doen.");


if(args[0]) return message.reply("Geen vloekwoord mee gegeven")

var word = args[0]

var jsonfile = fs.readFileSync("../data/woorden.json", "utf-8")
var woorden = JSON.parse(jsonfile)

woorden.push(word)

jsonfile   = JSON.stringify(woorden)
fs.writeFileSync("../data/woorden.json", jsonfile, "utf8")


return message.channel.send(`Je mag niet meer vloeken/schelden met ${word}`)
}

module.exports.help = {
 name: "scheld",  
 catogory: "mod",
 description: "Geeft je informatie",
 aliases: []
}