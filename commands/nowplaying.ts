import { MessageEmbed } from 'discord.js'
import { ICommand } from 'wokcommands'
import player from '../index'

export default {
    category: 'Music',
    description: 'Now playing',
    aliases: ['np'],

    callback: async ({ client, message }) => {
        const queue = player.createQueue(message.guild)

        if (!queue || !queue.playing) return message.reply('Not playing')

        let track = queue.current
        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();
        let embed = new MessageEmbed().setDescription(
            `Volume **${queue.volume}**%\nRequested by ${track.requestedBy}\n${progress} (**${timestamp.progress}**%)`
        );
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor({
            name: track.title || 'Loading...',
            iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })
        });
        embed.setTimestamp();
        embed.setFooter({
            text: "Made by George",
            iconURL: message.author.avatarURL({ dynamic: true })
        });

        let newMessage = await message.reply({
            embeds: [embed]
        })

        setInterval(() => {
            let queue = player.createQueue(message.guild)
            let timestamp = queue.getPlayerTimestamp()
            let progress = queue.createProgressBar()
            if (!queue)
                console.log("No queue")
            let track = queue.current || {
                thumbnail: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/43b892a2-9859-4905-be03-384c222c1f17/excerpt-lazy-load.png',
                title: 'Loading...',
                requestedBy: 'Unknown'
            }
            let newEmbed = new MessageEmbed
            newEmbed.setThumbnail(track.thumbnail || 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/43b892a2-9859-4905-be03-384c222c1f17/excerpt-lazy-load.png'
            )
            newEmbed.setAuthor({
                name: track.title || 'Loading...',
                iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })
            })
            newEmbed.setFooter({
                text: "Made by George",
                iconURL: message.author.avatarURL({ dynamic: true })
            })
            newEmbed.setDescription(`Volume **${queue.volume}**%\nRequested by ${track.requestedBy} \n${progress} (**${timestamp.progress || 'NaN'}**%)`)
            newMessage.edit({
                embeds: [newEmbed],
            }).catch(() => { return })
        }, 2000);
    }
} as ICommand