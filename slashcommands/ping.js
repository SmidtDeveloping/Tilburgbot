const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data:new SlashCommandBuilder()
    .setName('Ping')
    .setDescription("Ponger"),
    async execute(client, interaction) {
        interaction.reply({content: `Pong: ${client.ws.ping}ms `, ephermal: true})
    }
}