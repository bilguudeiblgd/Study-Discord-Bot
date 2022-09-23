const Discord = require('discord.js');
const { GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const Users = require('./database/user');


require('dotenv').config();
const client = new Discord.Client({
    intents: [GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});


const fs = require('fs');


client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.weeklyCommands = new Discord.Collection();

// listening for a voice channel
client.on("voiceStateUpdate", async (oldVoiceState, newVoiceState) => { // Listening to the voiceStateUpdate event
    
    if (oldVoiceState.selfDeaf != newVoiceState.selfDeaf) return;
    if (oldVoiceState.selfMute != newVoiceState.selfMute) return;
    if (oldVoiceState.serverDeaf != newVoiceState.serverDeaf) return;
    if (oldVoiceState.serverMute != newVoiceState.serverMute) return;
    if (oldVoiceState.selfVideo != newVoiceState.selfVideo) return;
    if (newVoiceState.channelId == config.voiceChannel || oldVoiceState.channelId == config.voiceChannel) {
        let user = await Users.findOne({ where: { id: newVoiceState.member.id } })
        if (!user) {
            user = await Users.create({
                id: newVoiceState.member.id,
                username: newVoiceState.member.user.username,
                studystarted: false,
                starttime: new Date(),
                endtime: new Date(),
                studytime: 0,
                weeklytime: 0,
            });
        }
        if (!user.studystarted) {
            if (newVoiceState.streaming) {
                await user.update({ starttime: new Date() });
                await user.update({ studystarted: true });
                let com = ["Good luck! ", "That's the drive!", "You are the best! :blush: ", "Grinding mode... on!!!"]
                let random = Math.floor(Math.random() * com.length);
                client.channels.cache.get(config.channel).send(`<@${newVoiceState.member.id}> ${com[random]}`)
            }
        }
        else {
            if (oldVoiceState.streaming) {
                console.log("ending because stopped streaming")
                const studyEnd = require('./commands/voice/voiceend');
                studyEnd.execute(oldVoiceState, user, Discord, client);
            }
            else if (oldVoiceState.channel) {
                console.log("ending because out of video chat")
                const studyEnd = require('./commands/voice/voiceend');
                studyEnd.execute(oldVoiceState, user, Discord, client);
            }


        }
        // end if stops streaming and leaves voice channel.

    }


});


['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

// process.env.DISCORD_TOKEN
client.login(process.env.DISCORD_TOKEN);