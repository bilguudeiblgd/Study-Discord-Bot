module.exports = {
    name: 'voiceend',
    description: 'ends studies when',
    async execute(oldVoiceState, user, Discord, client) {

        const tochannel = client.channels.cache.get('847532948874068038');

        let userID = oldVoiceState.member.id;
        if (!user.studystarted) return tochannel.send(`<@${userID}> how are you going to end it if you haven't started?`);

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
            .setDescription(`<@${userID}>\` have studied for \n\n hours: ${parseInt(diffTime / 3600)} \n\n minutes: ${parseInt((diffTime %3600) / 60)} \n\n seconds: ${parseInt(((diffTime%3600)% 60))} \``)
            .setFooter(`Total studied: ${parseInt(total / 3600)} hours`);



        await tochannel.send(endEmbed);
    }
}