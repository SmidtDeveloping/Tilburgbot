const discord = require("discord.js")
require("colors")
module.exports.run = async (client, message, args) => {

    const catid = "923982347379032094"

    var username = message.author.username

    var userdiscriminator = message.author.discriminator

    var reden = args.join(" ")
    if (!reden) return

    var ticketbestaad = false;

    message.guild.channels.cache.forEach((channel) => {


        if (channel.name == username.toLowerCase() + "-" + userdiscriminator) {
            message.channel.send("Je hebt al een ticket")
        }

        ticketbestaad = true

        return


    })

    if (ticketbestaad) return

    message.guild.channels.create(username.toLowerCase() + "-" + userdiscriminator, { type: "text" }).then((createdchan) => {


        createdchan.setParent(catid).then((settedParent) => {

            // Perms zodat iedereen niets kan lezen.
            settedParent.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name === "@everyone"), {

                SEND_MESSAGES: false,
                VIEW_CHANNEL: false

            });

            // READ_MESSAGE_HISTORY Was vroeger READ_MESSAGES
            // Perms zodat de gebruiker die het command heeft getypt alles kan zien van zijn ticket.
            settedParent.permissionOverwrites.edit(message.author.id, {
                CREATE_INSTANT_INVITE: false,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                ADD_REACTIONS: true
            });

            // Perms zodat de gebruikers die admin zijn alles kunnen zien van zijn ticket.
            settedParent.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name === "Support Team"), {
                CREATE_INSTANT_INVITE: false,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                ADD_REACTIONS: true
            });

            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0'); // Nul toevoegen als het bv. 1 is -> 01
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            today = `${dd}/${mm}/${yyyy}`;



            let embedParent = new discord.MessageEmbed()

            embedParent.setAuthor(message.author.username)
            embedParent.setTitle('nieuwe ticket')
            embedParent.addFields(
                { name: "Reden", value: reden, inline: true },
                { name: "Aangemaakt op", value: today, inline: true },
            )

            message.channel.send(" Ticket aangemaakt")

            settedParent.send({embeds: [embedParent]})


        }).catch(err => {
            console.log(`${err}`.red)
            message.channel.send("❌ Er is iets misgelopen")
        })
    }).catch(err => {
        console.log(`${err}`.red)
        message.channel.send("❌ Er is iets misgelopen")
    })


}

module.exports.help = {
    name: "info",
    catogory: "Info",
    description: "Geeft je informatie"
}