module.exports = {
    name: 'getrole',
    async execute(message, Users, Discord, client) {
        const user = await Users.findOne({ where: { id: message.author.id } });
        const logChannel = "1022812262265798656";

        let studytime = parseInt((user.studytime) / 3600);
        let prevRole = '';
        let newRole = '';
        let roles = {
                eightkyu: message.guild.roles.cache.find(role => role.name === "8kyu"),
                sevenkyu: message.guild.roles.cache.find(role => role.name === "7kyu"),
                sixkyu: message.guild.roles.cache.find(role => role.name === "6kyu"),
                fivekyu: message.guild.roles.cache.find(role => role.name === "5kyu"),
                fourkyu: message.guild.roles.cache.find(role => role.name === "4kyu"),
                threekyu: message.guild.roles.cache.find(role => role.name === "3kyu"),
                twokyu: message.guild.roles.cache.find(role => role.name === "2kyu"),
                onekyu: message.guild.roles.cache.find(role => role.name === "1kyu"),
            }
            // console.log(message.member.roles.cache.some(role => role.name === '8kyu'))

        // message.guild.members.cache.get(user.id).roles.forEach(role => console.log(role));
        let roleNames = ["8kyu", "7kyu", "6kyu", "5kyu", "4kyu", "3kyu", "2kyu", "1kyu"];
        roleNames.forEach(role => {
            if (message.member.roles.cache.some(selfRole => selfRole.name === role)) {
                prevRole = role;
                console.log("should delete " + role);
                let guildRole = message.guild.roles.cache.find(guildRole => guildRole.name === role)
                message.guild.members.cache.get(user.id).roles.remove(guildRole);
            }
        })

        if (studytime < 5) {
            await message.guild.members.cache.get(user.id).roles.add(roles.eightkyu);
            newRole = "8kyu";
        } else if (studytime >= 5 && studytime < 20) {

            await message.guild.members.cache.get(user.id).roles.add(roles.sevenkyu);
            newRole = "7kyu";

        } else if (studytime >= 20 && studytime < 50) {

            await message.guild.members.cache.get(user.id).roles.add(roles.sixkyu);
            newRole = "6kyu";
        } else if (studytime >= 50 && studytime < 100) {

            await message.guild.members.cache.get(user.id).roles.add(roles.fivekyu);
            newRole = "5kyu";
        } else if (studytime >= 100 && studytime < 200) {

            await message.guild.members.cache.get(user.id).roles.add(roles.fourkyu);
            newRole = "4kyu";
        } else if (studytime >= 200 && studytime < 500) {

            await message.guild.members.cache.get(user.id).roles.add(roles.fourkyu);
            newRole = "3kyu";
        } else if (studytime >= 500 && studytime < 1000) {

            await message.guild.members.cache.get(user.id).roles.add(roles.twokyu);
            newRole = "2kyu";
        } else if (studytime >= 1000 && studytime < 2000) {

            await message.guild.members.cache.get(user.id).roles.add(roles.onekyu);
            newRole = "1kyu";
        }
        if (prevRole != newRole) {
            await client.channels.cache.get(logChannel).send(`<@${message.author.id}> has advanced. **${prevRole} --> ${newRole}**`);
        }
    }
}