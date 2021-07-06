const Discord = require('discord.js');
const config = require('./config.json');
const Users = require('./database/user');


require('dotenv').config();
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });


const fs = require('fs');


client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.weeklyCommands = new Discord.Collection();

// listening for a voice channel

client.on("voiceStateUpdate", async(oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
    if (newVoiceState.channel) { // The member connected to a channel.
        console.log(`${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
    } else if (oldVoiceState.channel) { // The member disconnected from a channel.
        const user = await Users.findOne({ where: { id: oldVoiceState.member.id } });

        if (user.studystarted) {
            const studyEnd = require('./commands/voice/voiceend');
            studyEnd.execute(oldVoiceState, user, Discord, client);
        }
    };
});



['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});


// process.env.DISCORD_TOKEN
client.login(process.env.DISCORD_DEV_TOKEN);