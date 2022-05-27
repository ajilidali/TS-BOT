import { ICommand } from 'wokcommands'


export default {
    category: 'testing',
    description: 'Risponde con pong',

    callback: ({ message }) => { message.reply('pong') }
} as ICommand