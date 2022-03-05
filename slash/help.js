const {SlashCommandBuilder} = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")


module.exports={
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows all slash commands"),
    run: async ({client, interaction})=>{
       // const commands = client.slashcommands.map(cmd=>cmd.data.toJSON())
        const helpp = new MessageEmbed()
        .setTitle("Slash Commands")
        .setDescription("All slash commands are prefixed with `/`")
        .setColor("#0099ff")
        .setFooter("Slash Commands")
        .setTimestamp()
        .setThumbnail(client.user.avatarURL())
        .setAuthor(client.user.username, client.user.avatarURL())
        .addField("/help", "Shows all slash commands")
        .addField("/skipto", "Skips to a certain track #")
        .addField("/skip", "Skips the current song")
        .addField("/play", "Plays a song")
        .addField("/pause", "Pauses the current song")
        .addField("/resume", "Resumes the current song")
       // .addField("/volume", "Changes the volume of the current song")
        .addField("/queue", "Shows the current queue")
        .addField("/queue", "Shows the current queue")
        .setFooter({text:"This bot is made by:",'text':'Shadow Storme, UTKARSH Yadav' })
        .setTimestamp()
        .setThumbnail(client.user.avatarURL())
        //.setAuthor(client.user.username, client.user.avatarURL())
        interaction.reply({embeds:[helpp]})
    }
}