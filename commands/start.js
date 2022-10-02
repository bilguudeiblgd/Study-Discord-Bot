const config = require('../config.json');
module.exports = {
    name: 'start',
    description: 'starts off studies',
    async execute(message, Users, Discord, client) {
        if(message.channel.id = config.channel){
            return message.channel.send("You have to stream first!");
        }
        
        const user = await Users.findOne({ where: { id: message.author.id } });
        if (!message.member.voice.channel) return message.channel.send(`<@${message.member.id}> you have to join a **voice channel** so we can catch your suspicious attempts lol`);
        if (user.studystarted) return message.channel.send(`<@${message.member.id}> Your study has started! whisper: *stop procrastinating*`);
        if (user) {
            await user.update({ starttime: new Date() });
            await user.update({ studystarted: true })
        }

        await message.channel.send(`<@${message.member.id}> you rock! :fire:`);
    }
}