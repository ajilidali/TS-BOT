import { ICommand } from 'wokcommands'


export default {
    category: 'Test',
    description: 'Ping',

    callback: ({ message }) => {
    message.reply("pong")}
} as ICommand