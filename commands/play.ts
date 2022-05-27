import { MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import { QueryType } from 'discord-player'
import player from '../index'


export default {
    category: 'Music',
    description: 'Play',
    aliases: ['p'],

    callback: async ({ client, message, args }) => {
        const res = await player.search(args.join(" "), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO,
        });
        const queue = player.createQueue(message.guild, {
            metadata: message.channel,
        });
        try {
            !queue.connection ? await queue.connect(message.member.voice.channel).then(() => {
                queue.play(res.tracks[0])
            }) : !queue.playing ? queue.play(res.tracks[0]) : queue.addTrack(res.tracks[0])
        } catch (error) {
            return message.reply('An error occurred')
        }
        //gotta implement playlists
    }
    
} as ICommand