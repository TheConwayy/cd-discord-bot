import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'update',
    description: 'Notifies people that the bot will be down',

    slash: false,
    guildOnly: true,
    testOnly: true,

    permissions: ['ADMINISTRATOR'],

    callback: async ({ message }) => {

        message.delete()

        let embed = new MessageEmbed()
            .setDescription(`
**__BOT DOWNTIME__**

> This is a notification that the bot will be either down or on/off for maintenance.
> 
> We will notify you as soon as the bot is back up and *stable*.

*Sorry for any inconvenience.*`)
            .setColor('RED')


        message.channel.send({
            embeds: [embed]
        })

    }
} as ICommand