const data = require('./data');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const config = require('./config.json');

const client = new Discord.Client();

const prefix = config.prefix;

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
});
const Users = sequelize.define('users', {
    id: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
    },
    username: Sequelize.STRING,
    studytime: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});

const fs = require('fs');


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    client.user.setActivity("Studying");
    console.log("My study bot is online!!");

    Users.sync();
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args, data);
    } else if (command === 'study') {
        client.commands.get('study').execute(message, args);
    } else if (command === 'reactionrole') {
        client.commands.get('reactionrole').execute(message, args, Discord, client)
    }
});

module.exports = {
    userdb: Users,
}

client.login('ODQ3NTI0ODQ3MjUxNzUwOTIy.YK_VBQ.80SaXv7sbclh1tj6D_M0ohQ57VE');