import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const mysql = require('mysql')

export default {
    category: 'moderation',
    description: 'Clears a single infraction',

    slash: true,
    guildOnly: true,
    testOnly: true,

    permissions: ['ADMINISTRATOR'],

    options: [
        {
            type: 'INTEGER',
            name: 'id',
            description: 'The ID of the infraction you want to clear',
            required: true
        }
    ],

    callback: async ({ interaction, guild }) => {

        const ID = interaction.options.getInteger('id')

        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: `${guild?.id}`
        })

        let getquery = `
SELECT * FROM infractions WHERE ID=${ID}`

        let delquery = `
DELETE FROM infractions WHERE ID=${ID}`

        db.connect()

        await db.query(getquery, (err:any, rows:any) => {
            if (err) {
                console.log(err)
                return 'There was an issue finding that! Try a different ID'
            }

             rows.forEach((row:any) => {

                const user = guild?.members.cache.get(`${row.userid}`)
    
                const embed = new MessageEmbed()
                    .setTitle('~ CLEARING OF INFRACTION ~')
                    .setColor('WHITE')
                    .addField('Moderator who Cleared Infraction', `${interaction.user} (${interaction.user.username}#${interaction.user.discriminator} | \`${interaction.user.id}\`)`)
                    .addField('User of Infraction', `${user} (${user?.user.username}#${user?.user.discriminator} | \`${user?.id}\`)`)
                    .addField('Infraction', `
**Type:** ${row.infraction}
**Reason:** ${row.reason}
**Time:** <t:${row.epoch}:f> (<t:${row.epoch}:R>)`)

                const logC = guild?.channels.cache.get('986085090692038707')
                if (logC?.type === 'GUILD_TEXT') logC.type === 'GUILD_TEXT'
                else return 'There was an error!\nThe log channel is not a text channel!'

                logC.send({
                    embeds: [embed]
                })

            })

        })

        await db.query(delquery, (err:any) => {
            if (err) {
                console.log(err)
                return 'There was an error deleting the entry'
            }
        })

        db.end()

        return 'Infraction cleared'

    }
} as ICommand