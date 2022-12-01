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
        if (msg.content.startsWith(`<@${msg.client.user.id}>`) || msg.content.startsWith(`<@!${msg.client.user.id}>`) || msg.content.toLowerCase().includes(`aco`)) {
            client.util.handleTalk(msg);
        }
        if (msg.type === 'REPLY') {
            const msg1 = await msg.fetchReference();
            if (msg1.author.id === 1047503386251120660) {
                client.util.handleTalk(msg);
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

client.login(bot_token+"XIs");
