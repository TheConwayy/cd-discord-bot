import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
const mysql = require('mysql')

export default {
    category: 'moderation',
    description: 'Clears all infractions',

    slash: true,
    guildOnly: true,
    testOnly: true,

    permissions: ['ADMINISTRATOR'],

    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'The user that you want all infractions to be cleared',
            required: true
        }
    ],

    callback: async ({ interaction, guild }) => {

        const user = guild?.members.cache.get(`${interaction.options.getUser('user')?.id}`)

        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: `${guild?.id}`
        })

        let delquery = `
DELETE FROM infractions WHERE userid=${user?.id}`

        db.connect()

        await db.query(delquery, (err:any) => {
            if (err) {
                console.log(err)
                return 'There was an error deleting the entry'
            }
        })

        const embed = new MessageEmbed()
            .setTitle('~ CLEARING OF INFRACTIONS ~')
            .setColor('WHITE')
            .addField('Moderator who Cleared Infractions', `${interaction.user} (${interaction.user.username}#${interaction.user.discriminator} | \`${interaction.user.id}\`)`)
            .addField('User whos infractions were cleared', `${user} (${user?.user.username}#${user?.user.discriminator} | \`${user?.user.id}\`)`)


        const logC = guild?.channels.cache.get('986085090692038707')
        if (logC?.type === 'GUILD_TEXT') logC.type === 'GUILD_TEXT'
        else return 'There was an error!\nThe log channel is not a text channel!'

        logC.send({
            embeds: [embed]
        })

        db.end()

        return 'Infractions cleared'

    }
} as ICommand