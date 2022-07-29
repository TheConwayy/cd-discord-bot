import { ICommand } from "wokcommands";
const sql = require('mysql')

export default {
    category: 'moderation',
    description: 'Wanrns a user for the reason defined',

    slash: true,
    testOnly: true,
    guildOnly: true,

    permissions: ['KICK_MEMBERS'],

    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'The user you want to warn [REQUIRED]',
            required: true
        },
        {
            type: 'STRING',
            name: 'reason',
            description: 'The reason you want to warn the user [REQUIRED]',
            required: true
        }
    ],

    callback: async ({ interaction, guild }) => {

        const userID = interaction.options.getUser('user')?.id
        const user = guild?.members.cache.get(`${userID}`)

        const modID = interaction.user.id
        const mod = guild?.members.cache.get(`${modID}`)

        const reason = interaction.options.getString('reason')

        const epoch = Math.floor(interaction.createdTimestamp / 1000)

        const logC = guild?.channels.cache.get('986085090692038707')
        if (logC?.type === 'GUILD_TEXT') logC.type === 'GUILD_TEXT'
        else return 'There was an error!\nThe log channel is not a text channel!'

        if (interaction.user.id === userID) return "You can't warn yourself"
        if (!user) return 'Somehow there is no user! Please define a user'
        if (!reason) return 'You have to provide a reason'
        if (!mod) return 'For some reason, you could not be found.\nTry sending a couple messages'
        if (!logC) return 'The log channel could not be found! Give it another shot.'
        if (!epoch) return 'There was an issue trying getting the time! This is a requirement. Please try again.'

        const embed = {
            title: '~NEW INFRACTION~',
            fields: [
                {
                    name: 'Type',
                    value: 'WARN',
                    inline: true
                },
                {
                    name: 'Moderator',
                    value: `${mod} (${mod?.user.username}#${mod?.user.discriminator} | \`${modID}\`)`,
                    inline: true
                },
                {
                    name: 'Time',
                    value: `<t:${epoch}:f> (<t:${epoch}:R>)`
                },
                {
                    name: 'User',
                    value: `${user} (${user?.user.username}#${user?.user.discriminator} | \`${userID}\`)`
                },
                {
                    name: 'Reason',
                    value: `${reason}`
                }
            ]
        }

        await user.user.send({
            embeds: [embed]
        })

        await logC.send({
            embeds: [embed]
        })

        const db = sql.createConnection({
            host: 'localhost',
            user: 'root',
            database: `${guild?.id}`
        })

        db.connect()

        let query = `
INSERT INTO infractions (userid, modid, infraction, reason, epoch)
VALUES (${userID}, ${modID}, "WARN", "${reason}", ${epoch});`

        await db.query(query, (err:any) => {
            if (err) throw err
        })

        db.end();

        return 'User was warned.'

    }
} as ICommand