import { ICommand } from "wokcommands";
import Discord, { Message, MessageEmbed } from 'discord.js'

export default {
    category: 'utilities',
    description: 'The help command! [TEMP DISBALED]',

    slash: 'both',
    guildOnly: true,
    testOnly: true,

    options: [
        {
            type: 'STRING',
            name: 'category',
            description: 'The category that you need help in',
            required: true
        }
    ],

    callback: async ({ message, interaction, user }) => {

        if (message) return 'This server uses slash (`/`) commands!\nUse `/help` for help!'

        if (interaction) {

            const cat = interaction.options.getString('category')

            let sent:Discord.MessageEmbed;

            let aboutEmbed = new MessageEmbed()
                .setTitle('Help - About')
                .setColor('#ffffff')
                .setDescription(`
>>> Conway Development LLC was founded by Devin Conway in the *somewhat* wonderful year 2022 with one thing in mind:

Bring a __high quality product__ for a __low price__.

So, Devin got to work making free releases and even a couple of paid ones with this mission in mind.

*If you are looking for legal information regarding purchasing assets from out third party service "Tebex", here is their [terms](https://conway-development.tebex.io/terms/checkout) & [privacy](https://conway-development.tebex.io/terms/privacy)
Company policy can also be found in the <#986415121523937290> channel.*`)


            let commEmbed = new MessageEmbed()
                .setTitle('Help - Commands')
                .setDescription('All commands avilable *(other than moderation commands)*')
                .setColor('#ffffff')
                .addField('Fun Commands', `
**\`/roll\`**: Rolls a 6-sided die

**\`/flipacoin\`**: Flips a 2-sided coin`)

            let errEmebed = new MessageEmbed()
                .setDescription('There was an error. Please use one of the following categories.\n\n`/about`\n`/commands`')
                .setColor('WHITE')

            switch(cat) {
                case 'about':
                    sent = aboutEmbed
                    break;
                case 'commands':
                    sent = commEmbed
                    break;
                default:
                    sent = errEmebed
                    break;
            }

            return sent

        }

    }
} as ICommand