import { ICommand } from "wokcommands";
const sql = require('mysql')

export default {
    category: 'moderation',
    description: 'Mutes a user',

    slash: true,
    guildOnly: true,
    testOnly: true,

    permissions: ['KICK_MEMBERS'],

    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'User you want to mute [REQUIRED]',
            required: true
        },
        {
            type: 'STRING',
            name: 'reason',
            description: 'Reason you are muting this user'
        }
    ],

    callback: async ({ interaction, guild }) => {

        const userID = interaction.options.getUser('user')?.id
        const user = guild?.members.cache.get(`${userID}`)

        const modID = interaction.user.id
        const mod = guild?.members.cache.get(`${modID}`)

        const reason = interaction.options.getString('reason')
        function getReason() {
            if (reason) {
                return reason
            } else {
                return 'No reason provided.'
            }
        }

        const epoch = Math.floor(interaction.createdTimestamp / 1000)

        const logC = guild?.channels.cache.get('986085090692038707')
        if (logC?.type === 'GUILD_TEXT') logC.type === 'GUILD_TEXT'
        else return 'There was an error!\nThe log channel is not a text channel!'

        if (interaction.user.id === userID) return "You can't mute yourself"
        if (!user) return 'Somehow there is no user! Please define a user'
        if (!mod) return 'For some reason, you could not be found.\nTry sending a couple messages'
        if (!logC) return 'The log channel could not be found! Give it another shot.'
        if (!epoch) return 'There was an issue trying getting the time! This is a requirement. Please try again.'

        const embed = {
            title: '~NEW INFRACTION~',
            fields: [
                {
                    name: 'Type',
                    value: 'MUTE',
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
                    value: `${getReason()}`
                }
            ]
        }

        await user.roles.add('986433021550948402')

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
VALUES (${userID}, ${modID}, "MUTE", "${getReason()}", ${epoch});`

        await db.query(query, (err:any) => {
            if (err) throw err
        })

        db.end();

        return 'User was muted.'

    }
} as ICommand