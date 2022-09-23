const updateRole = require('./getrole');


module.exports = {
    name: 'end',
    description: 'ends studies',
    async execute(message, Users, Discord, client) {
        return;
        const user = await Users.findOne({ where: { id: message.author.id } });

        if (!user.studystarted) return message.channel.send(`<@${message.member.id}> how are you going to end it if you haven't started?`);

        if (user && user.studystarted) {
            await user.update({ endtime: new Date() });
            await user.update({ studystarted: false });
        }


        let starttime = user.starttime;
        let endtime = user.endtime;

        let diffTime = (endtime.getTime() - starttime.getTime()) / 1000;
        // updating total
        let total = user.studytime;
        total += diffTime
        await user.update({ studytime: total });
        // updating weekly
        let weekly = user.weeklytime;
        weekly += diffTime;

        await user.update({ weeklytime: weekly });

        const endEmbed = new Discord.MessageEmbed()
            .setColor('#67ebad')
            .setTitle('Study has Ended!')
            .setDescription(`<@${message.member.id}>\` have studied for \n\n hours: ${parseInt(diffTime / 3600)} \n\n minutes: ${parseInt((diffTime %3600) / 60)} \n\n seconds: ${parseInt(((diffTime%3600)% 60))} \``)
            .setFooter(`Total studied: ${parseInt(total / 3600)} hours`);

        updateRole.execute(message, Users, Discord, client);

        await message.channel.send(endEmbed);
    }
}