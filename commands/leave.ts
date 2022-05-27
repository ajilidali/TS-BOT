import { ICommand } from 'wokcommands'
import player from '../index'


export default {
    category: 'Music',
    description: 'Volume',
    aliases: ['stop', 'dc'],

    callback: async ({ message }) => {
        const queue = player.createQueue(message.guild)
        if (queue || queue.playing) {
            queue.clear()
            queue.destroy(true)
            return message.channel.send('Adios')
        }
    }
} as ICommand