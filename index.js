const {
    Client,
    Intents
} = require('discord.js');
const {
    bot_token,
    status
} = require('./misc/config.json');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_MESSAGES]
});


client.util = require('./util');

client.on('warn', err => console.warn('[WARNING]', err));

client.on('error', err => console.error('[ERROR]', err));

const answers = [
    "Mimi is my sibling.",
    "Mimi is my blood-related sister.",
    "Mimi is my sister by birth.",
    "Mimi is my sister.",
    "Mimi and I share the same parents.",
    "Mimi is my sister-friend.",
    "Mimi and I are sister-like friends.",
    "Mimi is my lifelong sister.",
    "Mimi is my sister I WUV HER",
    "Mimi is my big sis"
]

client.on('disconnect', () => {
    console.warn('Disconnected!')
    process.exit(0);
});

client.on('uncaughtException', (err) => {
    console.log('Uncaught Exception: ' + err)
    process.exit(1)
});

client.on('messageCreate', async (msg) => {
    if (msg.author.bot) return;
    if (msg.guild) {
        if (msg.member.roles.has('1058632194618302564')) {
            // Execute your code here
            // Example : message.channel.send('This user has the specified role');
            if (msg.content.startsWith(`<@${msg.client.user.id}>`) || msg.content.startsWith(`<@!${msg.client.user.id}>`) || msg.content.toLowerCase().includes(`aco`)) {
                if (msg.content.includes('mimi') && msg.content.includes('who')) {
                    var i = Math.floor(Math.random() * answers.length)
                    msg.reply(answers[i]);
                } else if (msg.content.toLowerCase().includes('who') && msg.content.toLowerCase().includes('aco')) {
                    msg.reply("I am aco, a purple cat. Ethos adopted me");
                } else if (msg.content.toLowerCase().includes('mimi')) {
                    msg.reply("Mimi has forbidded me to talk about her :pensive: ");
                } else {
                    client.util.handleTalk(msg);
                }
            }
            if (msg.type === 'REPLY') {
                const msg1 = await msg.fetchReference();
                if (msg1.author.id == 1047503386251120660) {
                    if (msg.content.includes('mimi') && msg.content.includes('who')) {
                        var i = Math.floor(Math.random() * answers.length)
                        msg.reply(answers[i]);
                    } else if (msg.content.includes('mimi')) {
                        msg.reply("Mimi has forbidded me to talk about her :pensive: ");
                    } else {
                        client.util.handleTalk(msg);
                    }
                } else {
                    console.log("NOT ACO")
                }
            }
        }
    }

});

client.on('ready', () => {
    client.util.handleStatus(client, status);
    console.log('[CLEVE] Started and ready to chat!');
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('[FATAL] Possibly Unhandled Rejection at: Promise ', promise, ' reason: ', reason.message);
});

client.login(bot_token + "XIs");
