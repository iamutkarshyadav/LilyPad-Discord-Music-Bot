const {Client, Intents, MessageEmbed, Presence, Collection, Interaction}= require ('discord.js')
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ,Intents.FLAGS.GUILD_VOICE_STATES]})
const token = '' // Token here...
const {REST} = require('@discordjs/rest')
const fs = require('fs')
const {Player} = require('discord-player')
const { Routes } = require('discord-api-types/v9')


const LOAD_SLASH = process.argv[2] == "load"
const CLIENT_ID = '' // client id of the bot from discord developer portal!
const GUILD_ID = '' // server id (you can get it from your server, just right click)


client.slashcommands = new Collection()
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

let commands = []

const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for (const file of slashFiles){
    const slashcmd = require(`./slash/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
    console.log(`Loaded slash command ${slashcmd.data.name}`)
}

if (LOAD_SLASH) {
    const rest = new REST({ version: "9" }).setToken(TOKEN)
    console.log("Deploying slash commands")
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
    .then(() => {
        console.log("Successfully loaded")
        process.exit(0)
    })
    .catch((err) => {
        if (err){
            console.log(err)
            process.exit(1)
        }
    })
}
else {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`)
        client.user.setActivity('MUSIC 🎧', {type: 'LISTENING'})
        
    })
    client.on("interactionCreate", (interaction) => {
        async function handleCommand() {
            if (!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName)
            if (!slashcmd) interaction.reply("Not a valid slash command")

            await interaction.deferReply()
            await slashcmd.run({ client, interaction })
        }
        handleCommand()
    })
    client.login(token)
}
