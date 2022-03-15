const { Client, Intents } = require("discord.js")
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
})


client.once("ready", () => {
    try {
        console.log("Klaar")
    } catch (error) {
        console.error(error)
    }
})

client.login(process.env.token)