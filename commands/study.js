const { parse } = require('dotenv');

module.exports = {
    name: 'study',
    description: 'this is a study command!',

    async execute(message, args, Users, Discord) {
        const user = await Users.findOne({ where: { id: message.author.id } });

        if (args == 'start') {

            if (!message.member.voice.channel) return message.channel.send(`<@${message.member.id}> you have to join a **voice channel** so we can catch your suspicious attempts lol`);
            if (user.studystarted) return message.channel.send(`<@${message.member.id}> Your study has started! whisper: *stop procrastinating*`);
            if (user) {
                await user.update({ starttime: new Date() });
                await user.update({ studystarted: true })
            }



            await message.channel.send(`<@${message.member.id}> you rock! :fire:`);


        } else if (args == 'end') {

            if (!user.studystarted) return message.channel.send(`<@${message.member.id}> how are you going to end it if you haven't started?`);

            if (user && user.studystarted) {
                await user.update({ endtime: new Date() });
                await user.update({ studystarted: false });
            }


            let starttime = user.starttime;
            let endtime = user.endtime;

            let diffTime = (endtime.getTime() - starttime.getTime()) / 1000;

            let total = user.studytime;
            total += diffTime
            await user.update({ studytime: total });
            let weekly = user.weeklytime;
            weekly += diffTime;
            const endEmbed = new Discord.MessageEmbed()
                .setColor('#67ebad')
                .setTitle('Study has Ended!')
                .setDescription(`<@${message.member.id}>\` have studied for \n\n hours: ${parseInt(diffTime / 3600)} \n\n minutes: ${parseInt((diffTime %3600) / 60)} \n\n seconds: ${parseInt(((diffTime%3600)% 60))} \``)
                .setFooter(`Total studied: ${parseInt(total / 3600)} hours`);

            await message.channel.send(endEmbed);

        } else if (args == 'total') {
            let studytime = user.studytime;
            console.log("total is working");
            const totalEmbed = new Discord.MessageEmbed()
                .setColor('#ffa500')
                .setTitle('Total Study time')
                .setDescription(` <@${message.member.id}>\` have studied for \n\n hours: ${parseInt(studytime / 3600)} \n\n minutes: ${parseInt((studytime %3600) / 60)} \n\n seconds: ${parseInt(((studytime%3600)% 60))} \``)
                .setFooter(`Hope you study more`);
            await message.channel.send(totalEmbed);

        } else if (args == 'weekly') {

            const weeklyEmbed = new Discord.MessageEmbed()
                .setColor('#ffa500')
                .setTitle('Weekly Study time')
                .setDescription(`<@${message.member.id}>\` have studied for \n\n hours: ${parseInt(weeklytime / 3600)}\n\n minutes: ${parseInt((weeklytime %3600) / 60)}\n\n seconds: ${parseInt(((weeklytime%3600)% 60))} this week \``)
                .setFooter(`Hope you study more`);
            await message.channel.send(weeklyEmbed);

        } else if (args == 'reset') {
            const queryAllUsers = () => {
                profileModel.find({}, (err, users) => {
                    if (err) {
                        console.log(err)
                    } else {
                        users.map(user => {
                            console.log(user);
                        })
                    }
                });
            }
        }


    },

}