import { Telegraf } from 'telegraf';
import axios from 'axios';

const bot = new Telegraf(process.env.UPLOADHIPPOBOT);

// Start message
bot.start((ctx) => ctx.reply('Welcome! Send me a link, and I will download the file and send it back to you.'));

// Handle text messages
bot.on('text', async (ctx) => {
    const link = ctx.message.text;

    // Set typing status
    ctx.telegram.sendChatAction(ctx.chat.id, 'typing');

    try {
        // Fetch the file
        const response = await axios.get(link, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        const filename = link.split('/').pop();

        // Determine file type
        const fileType = response.headers['content-type'];

        if (fileType.startsWith('image/')) {
            // Send as image
            await ctx.replyWithPhoto({ source: buffer, filename });
        } else if (fileType.startsWith('video/')) {
            // Send as video
            await ctx.replyWithVideo({ source: buffer, filename });
        } else {
            // Send as document
            await ctx.replyWithDocument({ source: buffer, filename });
        }
    } catch (error) {
        console.error('Error downloading file:', error);
        ctx.reply('Failed to download the file. Please ensure the link is correct and try again.');
    }
});

bot.launch();

export async function POST(request) {
    const body = await request.json();
    bot.handleUpdate(body);
    return new Response('ok');
}

export async function GET() {
    return new Response('This is a GET request. Please send a POST request to this endpoint.');
}
