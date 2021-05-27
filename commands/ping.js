module.exports = {
    name: 'ping',
    description: 'this is a ping command!',

    execute(message, args, data) {
        if (args[0] === 'studytime') {
            message.channel.send(`<@${message.member.id}>'s studytime is **${data[0].studytime / 3600} hours**`);
        } else {
            message.channel.send(`pong`);
        }
    }
}