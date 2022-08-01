import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'update',
    description: 'Notifies people that the bot is back up',

    slash: false,
    guildOnly: true,
    testOnly: true,

    permissions: ['ADMINISTRATOR'],

    callback: async ({ message }) => {

        message.delete()

        let embed = new MessageEmbed()
            .setDescription(`
**__BOT ONLINE__**

> This is a notification that the bot is now back online.

*Sorry for any inconvenience that may have been caused during the downtime.*`)
            .setColor('GREEN')


        message.channel.send({
            embeds: [embed]
        })

    }
} as ICommand