const Users = require('../../database/user');

module.exports = (client, Discord) => {
    client.user.setActivity("Grinding!");
    Users.sync();
    console.log("Bot is running");
}