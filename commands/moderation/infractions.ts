import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const sql = require('mysql')

export default {
    category: 'moderation',
    description: 'Gets all infrcations a user may have',

    slash: true,
    guildOnly: true,
    testOnly: true,

    permissions: ['KICK_MEMBERS'],

    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'The user you want infractions on',
            required: true
        }
    ],

    callback: async ({ interaction, guild }) => {

        const userID = interaction.options.getUser('user')?.id;
        const user = guild?.members.cache.get(`${userID}`)

        if (!user) return 'Somehow there is no user! Please define a user'

        const db = sql.createConnection({
            host: 'localhost',
            user: 'root',
            database: `${guild?.id}`
        })

        db.connect();

        let query = `
SELECT * FROM infractions WHERE userid=${userID}`

        db.query(query, (err:any, rows:any) => {
            if (err) throw err;

            const embed = new MessageEmbed()
                .setTitle('Infractions list')
                .setDescription(`All infractions for ${user}`)
                .setColor('WHITE')

            rows.forEach((row:any) => {
                embed.addField(`${row.infraction} - ID: ${row.ID}`, `
**Moderator:** <@${row.modid}>
**Reason:** ${row.reason}
**Time:** <t:${row.epoch}:f> (<t:${row.epoch}:R>)`)
            })

            interaction.reply({
                embeds: [embed]
            })
        })

        db.end()

    }
} as ICommand