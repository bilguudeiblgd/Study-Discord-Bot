module.exports = {
    name: 'leaderboard',
    description: 'this shows leaderboard',
    async execute(message, Users, Discord, client) {
        const topUsers = await Users.findAll({
            raw: true,
            limit: 5,
            order: [
                ['studytime', 'DESC'],
            ]
        });

        const leaderEmbed = new Discord.MessageEmbed()
            .setColor('#8520E3')
            .setTitle('Total Studytime Leaderboard')
            .setDescription(` 1: **${topUsers[0].username}** -> ${parseInt(topUsers[0].studytime / 3600)} hours\n\n 2: **${topUsers[1].username}** -> ${parseInt(topUsers[1].studytime / 3600)} hours\n\n 3: **${topUsers[2].username}** -> ${parseInt(topUsers[2].studytime / 3600)} hours\n\n
            `)
            .setFooter(`TOTAL STUDYTIME`);
        await message.channel.send(leaderEmbed);

    }
}