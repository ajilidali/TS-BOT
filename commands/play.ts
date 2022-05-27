import { MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import { QueryType } from 'discord-player'
import player from '../index'


export default {
    category: 'Music',
    description: 'Play',
    aliases: ['p'],

    /* callback: async ({ client, message, args }) => {
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
    } */
    callback: async ({client, message, args}) => {
        const res = await player.search(args.join(" "), {
          requestedBy: message.member,
          searchEngine: QueryType.AUTO,
        });
    
        const queue = await player.createQueue(message.guild, {
          metadata: message.channel,
        });
    
        try {
          if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
          await player.deleteQueue(message.guild.id);
          return message.channel.send(
            `I can't join the voice channel ${message.author}... try again ? ❌`
          );
        }
    
        await message.channel.send(
          `Loading your ${res.playlist ? "playlist" : "track"}... 🎧`
        );
    
        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
    
        if (!queue.playing) {
          await queue.play();
          return message.channel.send('playin');
        } else {
          return message.channel.send('added to q');
        }
      },
} as ICommand