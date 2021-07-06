const config = require('../../config.json');
const Users = require('../../database/user');

const prefix = config.prefix;

module.exports = async(client, Discord, message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    try {
        const user = await Users.create({
            id: message.author.id,
            username: message.author.username,
            studystarted: false,
            starttime: new Date(),
            endtime: new Date(),
            studytime: 0,
            weeklytime: 0,

        });

    } catch (e) {
        if (e.name != 'SequelizeUniqueConstraintError') {
            console.log("something is wrong with adding user" + e);
        }
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "study" || command === "stud" || command === "stu" || command === "st" || command === "s") {
        try {
            if (args[0] === "weekly") {
                client.weeklyCommands.get(args[1]).execute(message, Users, Discord, client);
                return;
            }
            client.commands.get(args[0]).execute(message, Users, Discord, client);
        } catch (err) {
            console.log(err);
        }
    }




}