import { ICommand } from 'wokcommands'
import player from '../index'



export default {
    category: 'Music',
    description: 'Risponde con pong',
    aliases: ['q'],

    callback: async ({client, message }) => {
        const queue = await player.createQueue(message.guild, {
            metadata: message.channel,
        });

    console.log(queue.tracks);
    //need to make ui

    }
} as ICommand