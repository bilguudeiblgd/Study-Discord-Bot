const Users = require('../../database/user');

module.exports = (client, Discord) => {
    client.user.setActivity("Studying");
    Users.sync();
    console.log("Bot is running");
}