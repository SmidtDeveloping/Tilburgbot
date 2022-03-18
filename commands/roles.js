const discord = require("discord.js")

module.exports.run  = async (bot, message, args) => {


    const role1 = message.guild.roles.cache.find(role => role.name === 'test1')
    const role2 = message.guild.roles.cache.find(role => role.name === 'test2')

    const row = new discord.MessageActionRow().addComponents(
    new discord.MessageButton()
    .setCustomId("roleeen")
    .setLabel("Test1")
    .setStyle("DANGER"),
    
    new discord.MessageButton()
    .setCustomId("roletwee")
    .setLabel("Test2")
    .setStyle("DANGER")
    )


    message.channel.send({ content: "Kies een role", components: [row]})


     // We maken een filter aan die nakijkt als het dezelfde gebruiker 
    // is die het bericht heeft aangemaakt.
    const filter = (interaction) => {
        if (interaction.user.id === message.author.id) return true;
        return interaction.reply("Jij kan dit niet gebruiken.");
    }
 
    // We maken een component collector aan die er voor zal zorgen dat we de knoppen kunnen opvangen.
    // We voegen de filter er aan toe en geven mee dat men enkel maar max één knop kan indrukken.
    const collector = message.channel.createMessageComponentCollector({
        filter,
        max: 1
    });
 
    // Als men een knop heeft ingdrukt zal dit worden opgeroepen.
    // Deze zal de CustomID ophalen van de knop en hier kan men deze dan
    // gaan vergelijken in eventueel een switch case om zo een desbtreffende actie te doen.
    collector.on("collect", async (interactionButton) => {
 
        const id = interactionButton.customId;
        const userid = interactionButton.user.id
        var bericht = '';

 
        switch (id) {
            case "test1":

            await interactionButton.guild.members.cache.get(userid).roles.cache.has(role1.id)
            ? await interactionButton.guild.members.cache.get(userid).roles.remove(role1.id).then(() => {
                bericht = "Je hebt de test1 role al hij wordt nu verwijdert"
            })
            :await interactionButton.guild.members.cache.get(userid).roles.add(role1.id).then(() => {
                bericht = "Je hebt de test1 role gekregen"
            })

                return interactionButton.reply(bericht);
            case "test2":
                await interactionButton.guild.members.cache.get(userid).roles.cache.has(role2.id)
                ? await interactionButton.guild.members.cache.get(userid).roles.remove(role1.id).then(() => {
                    bericht = "Je hebt de test2 role al hij wordt nu verwijdert"
                })
                :await interactionButton.guild.members.cache.get(userid).roles.add(role2.id).then(() => {
                    bericht = "Je hebt de test2 role gekregen"
                })
                return interactionButton.reply("Dit is de test2 knop");
            default:
                return interactionButton.reply("Deze knop heeft nog geen functionaliteit.");
        }
    });



}

module.exports.help = {
 name: "role",  
 catogory: "general",
 description: "Geeft je roles via knoppen",
 aliases: []
}