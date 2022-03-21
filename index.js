const { Client, Intents, MessageEmbed, Collection } = require("discord.js")
const { Prefix } = require("./config.json")
const fs = require("node:fs")
const levelFile = require("./data/levels.json")
const woordenScheld = require("./data/woorden.json")
const woordenScheldtop = require("./data/kickwoorden.json")

var errorembed = new MessageEmbed()
.setTitle("error")
.setDescription("Error")
require("colors")
require("dotenv").config
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})


client.commands = new Collection();
client.events = new Collection();
client.aliases = new Collection()


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.help.name, command);
    console.log("-".repeat("36"))
    console.log(`Command: ${command.help.name}, (${command.help.catogory})`.green)
    console.log(`Desc: ${command.help.description}`.green)
    console.log("-".repeat("36"))
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith(".js"))

for (const file of eventFiles) {
    const event = require(`./events/${file}`)

    client.events.set(event.help.name, event)
    console.log("-".repeat("36"))
    console.log(`Event: ${event.help.name}, (${event.help.catogory})`.red)
    console.log(`Desc: ${event.help.description}`.red)
    console.log("-".repeat("36"))

}



client.once("ready", () => {
    console.log("Online".green)
    client.user.setActivity("Tilburg", { type: "LISTENING" })


})

client.on("messageCreate", message => {


    if (message.author.bot) return

    var messagearray = message.content.split(" ")

    var command = messagearray[0]


    



    if (!message.content.startsWith(Prefix)) {
        RandomXP(message)

        var msg =  message.content.toLowerCase()

        for (let index = 0; index < woordenScheld.length; index++) {
            const Scheldwoord = woordenScheld[index];
            if(msg.includes(woordenScheld.toLowerCase())) {


                message.delete()
                return await message.channel.send("Je mag niet schelden/Vloeken").then(msg => {
                    setTimeout(() => {
                        msg.delete()

                    }, 3000 )
                })
            }

            for (let index = 0; index < woordenScheldtop.length; index++) {
                const hoofdscheldwoorden = woordenScheldtop[index];

                if(msg.includes(woordenScheldtop.toLowerCase())) {


                    message.delete()
                    var kicker = message.author.id
                    var reden = "Schelden met Kanker/erge scheldwoorden"

                    kicker.kick(reden)

                    return message.channel.send(kicker, "Gekickt", reden)
                }
                
            }
        }
    } else {

    if (message.author.bot) return

    var messagearray = message.content.split(" ")

    var command = messagearray[0]

    const comamnddata = client.commands.get(command.slice(Prefix.lenght))

    if(!commanddata) return

    var arguments = messagearray.slice(1)
    try {
        

await comamnddata.run(client,message,arguments)

    } catch (error) {
        console.log(error)
        
        await message.channel.send({embeds: [errorembed]})
    }
    }









    if (command == `${Prefix}role`) {
        var member = message.guild.members.cache.get(message.mentions.users.first().id)
        if (!member) return message.reply("Geen gebruiker gevonden")

    }
})



function RandomXP(message) {


    var randomXP = Math.floor(Math.random() * 15) + 1

    console.log(`XP: ${randomXP} Member: ${message.author.tag} Message: ${message.content}`)

    var userID = message.author.id


    if(!levelFile[userID]) {
        levelFile[userID] = {
            xp: 0,
            level: 0
        }
    }

    levelFile[userID].xp += randomXP


    var levelUser = levelFile[userID].level
    var xpuser = levelFile[userID].xp
    var nextlevelXP = levelUser * 300


    if(nextlevelXP == 0 ) nextlevelXP = 100

    if(xpuser >= nextlevelXP) {
      levelFile[userID].level += 1

      fs.WriteFile("./data/levels.json", JSON.stringify(levelFile),
      err => {
          if(err) return console.log("Iets ging fout mien jong")
      })


      var levelembed = new MessageEmbed()
      .setDescription("**Nieuw level**")
      .setcolor("#00FF00")
      .addField("Nieuw Level:", levelFile[userID].level.toString())
      .addField("XP:", levelFile[userID].xp.toString())
      message.channel.send({embeds: [levelembed]})
    }
}
client.login(process.env.token)



// client.login("")



