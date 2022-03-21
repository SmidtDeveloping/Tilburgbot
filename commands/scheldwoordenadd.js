const discord = require("discord.js")
const file = require("../data/woorden.json")
const fs = require("node:fs")



module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Je hebt geen perms")

    if (!args[0]) return message.reply("Geen vloekwoord gevonden")

    var word = args[0].toLowerCase()

    var SwearWordsJSON = fs.readFileSync(file, "utf-8")
    var swearwords = JSON.parse(SwearWordsJSON)


    swearwords.push(word)

    SwearWordsJSON = JSON.stringify(swearwords)
    fs.writeFileSync(file, swearwords, "utf-8")


    return message.channel.send(`Vloekwoord ${word} toegevoegd`)
}

module.exports.help = {
    name: "scheldwoord",
    catogory: "Info",
    description: "Geeft je informatie",
    aliases: []
}