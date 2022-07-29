import { ICommand } from "wokcommands";

export default {
    category: 'fun',
    description: 'Rolls a die!',

    slash: true,
    guildOnly: true,
    testOnly: true,

    callback: async ({  }) => {

        let sides = [
            // One
            'https://cdn.discordapp.com/attachments/986120449354264618/986120737926557736/dice_1-512.png',
            // Two
            'https://cdn.discordapp.com/attachments/986120449354264618/986120737725222952/dice_2-256.png',
            // Three
            'https://cdn.discordapp.com/attachments/986120449354264618/986120737481982073/dice_3-256.png',
            // Four
            'https://cdn.discordapp.com/attachments/986120449354264618/986120737272250418/2792938.png',
            // Five
            'https://cdn.discordapp.com/attachments/986120449354264618/986120737054154792/2792949.png',
            // Six
            'https://cdn.discordapp.com/attachments/986120449354264618/986120736798306344/2792948.png'
        ]

        let attachment = sides[Math.floor(Math.random() * sides.length)]

        let embed = {
            title: 'You rolled:',
            image: { url: `${attachment}` },
            color: 0xFFFFFF
        }

        return embed

    }
} as ICommand