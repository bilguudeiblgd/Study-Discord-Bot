module.exports = {
    name: 'total',
    description: 'get user\'s total study time',
    async execute(message, Users, Discord, client) {
        const user = await Users.findOne({ where: { id: message.author.id } });
        let studytime = user.weeklytime;
        console.log("weekly total is working");
        const totalEmbed = new Discord.MessageEmbed()
            .setColor('#ffa500')
            .setTitle('Total Study Time in This Week')
            .setDescription(` <@${message.member.id}>\` have studied for \n\n hours: ${parseInt(studytime / 3600)} \n\n minutes: ${parseInt((studytime %3600) / 60)} \n\n seconds: ${parseInt(((studytime%3600)% 60))} \``)
            .setFooter(`Hope you study more`);
        await message.channel.send(totalEmbed);
    }
}