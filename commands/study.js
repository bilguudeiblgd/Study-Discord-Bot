module.exports = {
    name: 'study',
    description: 'this is a study command!',
    start: new Date(),
    end: new Date(),
    execute(message, args, userdb) {
        let startDate;
        let endDate;
        let studyStarted;
        if (args == 'start') {

            if (!studyStarted) {
                // startDate = new Date();
                if (!message.member.voice.channel) {
                    message.channel.send(`<@${message.member.id}> you have to join a **voice channel** so we can catch your suspicious attempts lol`);
                    return;
                }

                this.start = new Date();
                message.channel.send(`<@${message.member.id}> you rock! :fire:`);
            } else {
                message.channel.send(`your study has already started!`);
            }
            studyStarted = true;
        } else if (args == 'end') {
            studyStarted = false;
            endDate = new Date();
            this.end = new Date();
            let diffTime = (this.end.getTime() - this.start.getTime()) / 1000;

            message.channel.send(`study has ended. Total study time: `);
            message.channel.send(`\`hours: ${parseInt(diffTime / 3600)}\``);
            diffTime %= 3600
            message.channel.send(`\`minutes: ${parseInt(diffTime / 60)}\``);
            diffTime %= 60
            message.channel.send(`\`seconds: ${parseInt(diffTime)}\``);

        }
    },

}