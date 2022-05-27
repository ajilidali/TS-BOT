import { ICommand } from 'wokcommands'
import player from '../index'


export default {
    category: 'Music',
    description: 'Volume',
    aliases: ['stop', 'dc'],

    callback: async ({ message }) => {
        const queue = await player.createQueue(message.guild)
        if (queue || queue.playing) {
            queue.stop()
            queue.clear()
            queue.destroy()
            return message.channel.send('Adios')
        }
    }
} as ICommand