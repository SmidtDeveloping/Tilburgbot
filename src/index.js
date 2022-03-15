const discord, { Intents } = require("discord.js")
const client = new discord.Client({
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

clinet.login(procces.env.token)
