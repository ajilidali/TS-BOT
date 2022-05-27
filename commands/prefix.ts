import {ICommand} from "wokcommands"


export default {
    category:'General',
    description:'Cambia il prefisso',
    aliases:['px'],

    callback: ({message}) =>{message.reply("pong")}
} as ICommand