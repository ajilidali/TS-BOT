import { MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import { QueryType } from 'discord-player'
import player from '../index'

export default {
    category: 'Music',
    description: 'Play',
    aliases: ['p'],

    callback: async ({ client, message, args }) => {
        if (!args[0]) {
            message.channel.send("Gimme something to search")
            return
        }
        const res = await player.search(args.join(" "), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO,
        });

        if (!res || !res.tracks.length)
            return message.channel.send(
                `No results found ${message.author}... try again ? ❌`
            );
        const queue = player.createQueue(message.guild, {
            metadata: message.channel,
        });
        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel)
        } catch (error) {
            return message.channel.send("Cannot connect to VC")
        }
        
        if (!queue.playing) {
            await queue.play();
            var embed = new MessageEmbed()
                .addField(
                    `Now Playing`,
                    `[${queue.current.title}](${queue.current.url})`,
                    true
                )
                .setTimestamp()
                .setThumbnail(queue.current.thumbnail)
                .setColor(13702935)
                .setFooter({
                    text: `${message.author.tag}`,
                    iconURL: message.author.avatarURL({ dynamic: true })
                }
                );
            return message.channel.send({ embeds: [embed] });
        }
        else {
            var embed = new MessageEmbed()
                .addField(
                    `Added to queue`,
                    `[${res.tracks[0].title}](${res.tracks[0].url})`,
                    true
                )
                .setTimestamp()
                .setThumbnail(res.tracks[0].thumbnail)
                .setColor(13702935)
                .setFooter({
                    text: `${message.author.tag}`,
                    iconURL: message.author.avatarURL({ dynamic: true })
                }
                );
        }
        return message.channel.send({ embeds: [embed] });
        // TODO:add embed

    }

} as ICommand