import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import wokcommands from 'wokcommands'
import path from 'path'
import { Player } from 'discord-player'
//import testSchema from './test-schema'

dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]
})

const player = new Player(client);


client.on('ready', () => {
    new wokcommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        mongoUri: process.env.MONGO_URI,
    })

    /*     setTimeout(async () => {//make new db collection
            await new testSchema({
                message: 'Hello world'
            }).save();
        }, 1000) */
})

export default player

client.login(process.env.TOKEN)