module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = '847490551074914386';

        const mathRole = message.guild.roles.cache.find(role => role.name === "mathematics");
        const spaceRole = message.guild.roles.cache.find(role => role.name === "cosmology");
        const philosophyRole = message.guild.roles.cache.find(role => role.name === "philosophy");
        const religionRole = message.guild.roles.cache.find(role => role.name === "religion");
        const chemRole = message.guild.roles.cache.find(role => role.name === "chemistry");
        const bioRole = message.guild.roles.cache.find(role => role.name === "biology");
        const artRole = message.guild.roles.cache.find(role => role.name === "the arts");
        const physicsRole = message.guild.roles.cache.find(role => role.name === "physics");
        const psychologyRole = message.guild.roles.cache.find(role => role.name === "psychology");
        const medRole = message.guild.roles.cache.find(role => role.name === "medicine");
        const compsciRole = message.guild.roles.cache.find(role => role.name === "computer science");
        const historyRole = message.guild.roles.cache.find(role => role.name === "history");

        // Emojis

        const mathEmoji = '🧮';
        const spaceEmoji = '🔭';
        const philosophyEmoji = '💭';
        const religionEmoji = '🛐';
        const chemEmoji = '⚗️';
        const bioEmoji = '🧬';
        const artEmoji = '🎨';
        const physicsEmoji = '🧭';
        const psychologyEmoji = '🧠';
        const medEmoji = '💊';
        const compsciEmoji = '🖥️';
        const historyEmoji = '📜';

        let embed = new Discord.MessageEmbed().setColor('#fff500')
            .setTitle('Test')
            .setDescription(`Choose your interests.\n\n \`${mathEmoji} for Math\` 
            \n\n${spaceEmoji} for Study of Outer Space
            \n\n${compsciEmoji} for Study of Computers
            \n\n${bioEmoji} for Study of Life
            \n\n${chemEmoji} for Study of Behaviour and Property of Matter
            \n\n${artEmoji} for Study of Art
            \n\n${physicsEmoji} for Knowledge of Nature
            \n\n${psychologyEmoji} for Study of Mind and Behaviour
            \n\n${historyEmoji} for Study of Past
            \n\n${medEmoji} for Study of illness
            \n\n${philosophyEmoji} for Love of Wisdom
            \n\n${religionEmoji} for Study of Religious belief, behaviour and institution.
            `)
        let messageEmbed = await message.channel.send(embed);
        Promise.all([
            messageEmbed.react(mathEmoji),
            messageEmbed.react(spaceEmoji),
            messageEmbed.react(bioEmoji),
            messageEmbed.react(chemEmoji),
            messageEmbed.react(artEmoji),
            messageEmbed.react(physicsEmoji),
            messageEmbed.react(psychologyEmoji),
            messageEmbed.react(historyEmoji),
            messageEmbed.react(medEmoji),
            messageEmbed.react(religionEmoji),
            messageEmbed.react(compsciEmoji),

        ]).catch(error => console.error('One of the emojis failed to react: ', error));

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            // if (!reaction.member.guild) return;
            
            if (reaction.message.channel.id == channel || reaction.message.channel.id == '847532586137026571') {
                console.log("hey im gonna go ahead and do roles");
                switch(reaction.emoji.name){
                    case mathEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.add(mathRole).catch(e => console.error('Failed to add role: ', e));
                        break;
                    case compsciEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.add(compsciRole);
                        break;
                    case religionEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.add(religionRole);
                        break;
                    case bioEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.add(bioRole);
                        break;
                    case historyEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.add(historyRole);
                        break;
                    case medEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.add(medRole);
                        break;
                    case spaceEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.add(spaceRole);
                        break;
                    case philosophyEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.add(philosophyRole);
                        break;
                    case psychologyEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.add(psychologyRole);
                        break;
                    case artEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.add(artRole);
                        break;
                    case chemEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.add(chemRole);
                        break;
                    case physicsEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.add(physicsRole);
                        break;
                    
                }
                
            }
        });
        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            // if (!reaction.member.guild) return;
            
            if (reaction.message.channel.id == channel || reaction.message.channel.id == '847532586137026571') {
   
                switch(reaction.emoji.name){
                    case mathEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(mathRole).catch(e => console.error('Failed to add role: ', e));
                        break;
                    case compsciEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(compsciRole);
                        break;
                    case religionEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(religionRole);
                        break;
                    case bioEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(bioRole);
                        break;
                    case historyEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(historyRole);
                        break;
                    case medEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(medRole);
                        break;
                    case spaceEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(spaceRole);
                        break;
                    case philosophyEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(philosophyRole);
                        break;
                    case psychologyEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(psychologyRole);
                        break;
                    case artEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(artRole);
                        break;
                    case chemEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(chemRole);
                        break;
                    case physicsEmoji:
                        await reaction.message.guild.members.cache.get(user.id).roles.remove(physicsRole);
                        break;
                    
                }
                
            }
        });
    }
}