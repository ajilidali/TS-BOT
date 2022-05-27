import { ICommand } from 'wokcommands'
import player from '../index'


export default {
    category: 'Music',
    description: 'Volume',
    aliases: ['stop', 'dc'],

    callback: ({ message }) => {
        const queue = player.createQueue(message.guild)
        !queue || !queue.playing ? message.channel.send("Not connected") : queue.destroy(true)
        return
    }
} as ICommand