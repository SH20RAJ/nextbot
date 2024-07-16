const TelegramBot = require('node-telegram-bot-api');

const token = process.env.SAAVNBOT;
const bot = new TelegramBot(token);
let baseurl = "https://saavn.dev/api/";

export const POST = async (req, res, next) => {
    let data = await req.json();
    let manychat = fetch("https://wh.manychat.com/tgwh/tg0o83f4yg73hfgi73f2g89938g/6999742603/454fbe4e2f6df9c24941ea5bfc5ac9f71ae0daa9", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    const message = data.message || data.edited_message;
    console.log(message);

    const startMessage = "🎵 Welcome to @saavnbot! 🎵\n\nSend me a song title, and I will fetch the details for you. 🚀";

    const chatId = message.chat.id;
    const textContent = message.text || (message.caption ? message.caption : '');
    bot.sendChatAction(chatId, 'typing')

    if (textContent.toLowerCase() === 'hi') {
        bot.sendMessage(chatId, 'Hello!!');
    } else if (textContent === "/start") {
        bot.sendMessage(chatId, startMessage);
    } else {
        bot.sendChatAction(chatId, 'typing');

        console.log("text", textContent);
        
        // Fetch song details from Saavn API
        const songDetails = await fetchSongDetails(textContent);

        console.log("songDetails", songDetails.results[0]);

        let songs = songDetails.results;

        if (songs.length > 0) {
            songs.map(song => {
                sendSong(song, chatId);
            });
        }
        else {
            bot.sendMessage(chatId, "Sorry, I couldn't find the song details. Try again or request more bots on @sopbots 🚀\n\n" + startMessage);
        }



        
    }

    return Response.json({
        message: 'Message sent successfully'
    });
}

export const GET = async (req, res, next) => {
    console.log(req);
    return Response.json({});
}

async function fetchSongDetails(songTitle) {
    // console.log("title", songTitle);
    const response = await fetch(`${baseurl}search/songs?query=${encodeURIComponent(songTitle)}`);
    const data = await response.json();
    console.log(data);

    return data.data;
}


export const sendSong = async (song, chatId) => {

    if (song) {

        let songDetails = `🎵 *${song.name}* 🎵\n\n`;
        songDetails += `🎤 *Artists*: ${song.artists.primary.map(artist => `[${artist.name}](${artist.url})`).join(', ')}\n`;
        songDetails += `📀 *Album*: [${song.album.name}](${song.album.url})\n`;
        songDetails += `🎶 *Language*: ${song.language}\n`;
        songDetails += `📅 *Year*: ${song.year}\n`;
        songDetails += `🔗 *URL*: [Listen on JioSaavn](${song.url})\n\n`;

        songDetails += `📻 *Play Count*: ${song.playCount}\n`;
        songDetails += `🕒 *Duration*: ${Math.floor(song.duration / 60)}:${song.duration % 60}\n`;
        songDetails += `🎵 *Label*: ${song.label}\n`;
        songDetails += `🎵 *Explicit Content*: ${song.explicitContent ? 'Yes' : 'No'}\n`;

        // bot.sendMessage(chatId, songDetails, {
        //     parse_mode: 'Markdown',
        //     // disable_web_page_preview: true
        // });
        bot.sendPhoto(chatId, song.image[2].url, {
            caption: songDetails,
            parse_mode: 'Markdown'
        });
        bot.sendDocument(chatId, song.downloadUrl.at(-1).url, {
            caption: `🎵 *${song.name}* 🎵\n\n📻 *Play Count*: ${song.playCount}\n🕒 *Duration*: ${Math.floor(song.duration / 60)}:${song.duration % 60}\n🎵 *Label*: ${song.label}\n🎵 *Explicit Content*: ${song.explicitContent ? 'Yes' : 'No'}\n🔗 *URL*: [Download MP3](${song.media_url})\n\n🚀 *Download the song and enjoy!* 🚀`,
            parse_mode: 'Markdown'
        });

    } else {
        bot.sendMessage(chatId, "Sorry, I couldn't find the song details. Try again or request more bots on @sopbots 🚀\n\n" + startMessage);
    }
}