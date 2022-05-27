import { MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import player from '../index'

export default {
    category: 'testing',
    description: 'Now playing',
    aliases: ['np'],

    callback: async ({ client, message }) => {
        const queue = player.createQueue(message.guild, {
            metadata: message.channel,
        })

        if (!queue.playing) return message.reply('Not playing')

        const newMessage = await message.reply(queue.current.title);

        await setInterval(() => {

            const queue = player.createQueue(message.guild, {
                metadata: message.channel,
            })
            let timestamp = queue.getPlayerTimestamp();
            var progress = queue.createProgressBar();
            let track = queue.nowPlaying() || {
                thumbnail: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/43b892a2-9859-4905-be03-384c222c1f17/excerpt-lazy-load.png',
                title: 'Loading...'
            };
            let newEmbed = new MessageEmbed;
            newEmbed.setThumbnail(track.thumbnail);
            newEmbed.setAuthor(track.title || "", client.user.displayAvatarURL({ size: 1024, dynamic: true }));
            newEmbed.setDescription(`Volume **${queue.volume}**%\nRequested by \n${progress} (**${timestamp.progress}**%)`);
            newMessage.edit({
                embeds: [newEmbed],
            });
        }, 3000);
    }
} as ICommand