import { MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import { QueryType } from 'discord-player'
import player from '../index'


export default {
    category: 'Music',
    description: 'Play',
    aliases: ['p'],

    callback: async ({ client, message, args }) => {
        if (!args[0]) { message.channel.send("Gimme something to search")
        return }
        const res = await player.search(args.join(" "), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO,
        });
        const queue = player.createQueue(message.guild, {
            metadata: message.channel,
        });
        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
        if (!queue.connection) await queue.connect(message.member.voice.channel)
        if (!queue.playing) await queue.play();
        const embed = new MessageEmbed()
        // TODO:add embed

    }

} as ICommand