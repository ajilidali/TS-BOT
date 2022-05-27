if (process.env.NODE_ENV != "production") {
  dotenv.config();
}
import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import wokcommands from "wokcommands";
import path from "path";
import { Player } from "discord-player";
import config from "./config";

//import testSchema from './test-schema'

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

const player = new Player(client, config.opt.discordPlayer);

client.on("ready", () => {
  new wokcommands(client, {
    commandDir: path.join(__dirname, "commands"),
    typeScript: true,
    mongoUri: process.env.MONGO_URI,
  });

  /*     setTimeout(async () => {//make new db collection
            await new testSchema({
                message: 'Hello world'
            }).save();
        }, 1000) */
});

export default player;

client.login(process.env.TOKEN);
