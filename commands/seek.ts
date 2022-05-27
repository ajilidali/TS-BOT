import { ICommand } from 'wokcommands'
import player from '../index'
const ms = require('ms')



export default {
    category: 'Music',
    description: 'Cambia il prefisso',


    callback: async ({ message, args }) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const timeToMS = ms(args.join(' '));

        if (timeToMS >= queue.current.durationMS) if (!queue) {
            queue.clear()
            queue.destroy();
        }
        else queue.skip()

        await queue.seek(timeToMS);

        message.channel.send(`Time set on the current song **${ms(timeToMS, { long: true })}** ✅`);
    }
} as ICommand