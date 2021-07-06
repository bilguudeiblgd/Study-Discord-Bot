module.exports = {
    name: 'leaderboard',
    description: 'this shows leaderboard',
    async execute(message, Users, Discord, client) {
        const topUsers = await Users.findAll({
            raw: true,
            limit: 5,
            order: [
                ['weeklytime', 'DESC'],
            ]
        });

        const leaderEmbed = new Discord.MessageEmbed()
            .setColor('#8520E3')
            .setTitle('Weekly Leaderboard')
            .setDescription(` 1: **${topUsers[0].username}** -> ${parseInt(topUsers[0].weeklytime / 3600)} hours\n\n 2: **${topUsers[1].username}** -> ${parseInt(topUsers[1].weeklytime / 3600)} hours\n\n 3: **${topUsers[2].username}** -> ${parseInt(topUsers[2].weeklytime / 3600)} hours\n\n
            `)
            .setFooter(`WEEKLY STUDYTIME`);
        await message.channel.send(leaderEmbed);

    }
}
