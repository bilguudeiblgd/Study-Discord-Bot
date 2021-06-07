
const Discord = require('discord.js');
const config = require('./config.json');
require('dotenv').config();
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = config.prefix;
const alias = ['s', 'st', 'stu', 'stud']

const fs = require('fs');


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    client.user.setActivity("Studying");
    console.log("Pls develop me more!!");
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    console.log(args);
    const command = args.shift().toLowerCase();
    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'study') {
        client.commands.get('study').execute(message, args);
    } else if (command === 'reactionrole') {
        client.commands.get('reactionrole').execute(message, args, Discord, client)
    }
});

client.login(process.env.DISCORD_TOKEN);