const fs = require('fs');

module.exports = (client, Discord, Users) => {
    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    const weekly_files = fs.readdirSync('./commands/weekly/').filter(file => file.endsWith('.js'));
    command_files.forEach(file => {

        const command = require(`../commands/${file}`);
        if (command.name) {
            client.commands.set(command.name, command);
        }
    });

    weekly_files.forEach(file => {
        const weekly_command = require(`../commands/weekly/${file}`);
        if (weekly_command.name) {
            client.weeklyCommands.set(weekly_command.name, weekly_command);
        }
    });

}