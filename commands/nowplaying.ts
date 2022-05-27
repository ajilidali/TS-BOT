import { MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import player from '../index'

export default {
    category: 'Music',
    description: 'Now playing',
    aliases: ['np'],

    callback: async ({ client, message }) => {
        const queue = player.createQueue(message.guild)

        if (!queue.playing) return message.reply('Not playing')

        const newMessage = await message.reply(queue.current.title);

        await setInterval(() => {
            const queue = player.createQueue(message.guild, {
                metadata: message.channel,
            })
            let timestamp = queue.getPlayerTimestamp();
            var progress = queue.createProgressBar();
            if (!queue) console.log("No queue")
            let track = queue.current || { //queue.current exception when song finishes and is last in queue
                thumbnail: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/43b892a2-9859-4905-be03-384c222c1f17/excerpt-lazy-load.png',
                title: 'Loading...',
                requestedBy: 'Unknown'
            };
            let newEmbed = new MessageEmbed;
            newEmbed.setThumbnail(track.thumbnail || 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/43b892a2-9859-4905-be03-384c222c1f17/excerpt-lazy-load.png',
            );
            newEmbed.setAuthor(track.title || 'Loading...', client.user.displayAvatarURL({ size: 1024, dynamic: true }));
            newEmbed.setDescription(`Volume **${queue.volume}**%\nRequested by ${track.requestedBy} \n${progress} (**${timestamp.progress || 'NaN'}**%)`);
            newMessage.edit({
                embeds: [newEmbed],
            }).catch(error =>{return;})
        }, 2000);
    }
} as ICommand