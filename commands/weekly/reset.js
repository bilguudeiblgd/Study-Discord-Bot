module.exports = {
    name: 'reset',
    description: 'this resets',
    async execute(message, Users, Discord, client) {
        const allUsers = await Users.findAll(

        );

        allUsers.forEach(async(user) => {
            await user.update({ weeklytime: 0 });
        })

    }
}