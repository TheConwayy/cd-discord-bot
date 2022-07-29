import { ICommand } from "wokcommands";

export default {
    category: 'fun',
    description: 'Flips a coin',

    slash: true,
    guildOnly: true,
    testOnly: true,

    callback: async ({  }) => {

        let sides = [
            // heads
            'https://cdn.discordapp.com/attachments/986120449354264618/986124192871227432/heads.png',
            //Tails
            'https://cdn.discordapp.com/attachments/986120449354264618/986124192623771718/tails.png'
        ]

        let attachment = sides[Math.floor(Math.random() * sides.length)]

        let embed = {
            title: 'You got:',
            image: { url: `${attachment}` },
            color: 0xFFFFFF
        }

        return embed

    }
} as ICommand