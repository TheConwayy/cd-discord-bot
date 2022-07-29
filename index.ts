import Discord from 'discord.js'
import WOK from 'wokcommands'
import dv from 'dotenv'
import path from 'path'
dv.config();

const sql = require('mysql')

const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_MESSAGES',
        'GUILD_BANS'
    ]
})

client.on('ready', () => {
    console.log('Bot online')

    new WOK(client, {
        commandDir: path.join(__dirname, 'commands'),
        botOwners: ['384010503824867328'],
        typeScript: true,
        testServers: ['983720375902945291']
    })
})

client.on('guildMemberAdd', async (user) => {

    const guild = user.guild

    const welcomeC = guild.channels.cache.get('986093830258434068')
    if (welcomeC?.type === 'GUILD_TEXT') welcomeC.type === 'GUILD_TEXT'
    else return;

    let emojiArr = ["👋", "🎉", "🥳", "🤩", "🤗"]
    let ranEmoji = emojiArr[Math.floor(Math.random() * emojiArr.length)]

    welcomeC.send({
        content: `> ${ranEmoji} Welcome to the server ${user}!\nYou are member #${guild.memberCount} 🎉`
    })

})

client.on('guildMemberRemove', async (user) => {

    const guild = user.guild

    const welcomeC = guild.channels.cache.get('986093830258434068')
    if (welcomeC?.type === 'GUILD_TEXT') welcomeC.type === 'GUILD_TEXT'
    else return;

    let emojiArr = ["👋", "😫", "😕", "😥", "🥺"]
    let ranEmoji = emojiArr[Math.floor(Math.random() * emojiArr.length)]

    welcomeC.send({
        content: `> ${user.user.username}#${user.user.discriminator} just left the server ${ranEmoji}\nWe are now at ${guild.memberCount} members.`
    })

})

client.login(process.env.TOKEN)