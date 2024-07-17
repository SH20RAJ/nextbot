import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.SAAVNBOT;
const bot = new TelegramBot(token, { polling: false });
let baseurl = "https://saavn.dev/api/";
let limit = 15;
let botlogger = "-1002207288648"

// Initialize Telegram bot logic
bot.on("message", async (message) => {
  const chatId = message.chat.id;
  let textContent = message.text || (message.caption ? message.caption : "");
  bot.sendChatAction(chatId, "typing");

  if (textContent.toLowerCase() === "hi") {
    bot.sendMessage(chatId, "Hello!!");
  } else if (textContent === "/start") {
    const startMessage =
      "🎵 Welcome to @saavnmp3_bot! 🎵\n\nSend me a song title, and I will fetch the details for you. 🚀";
    bot.sendMessage(chatId, startMessage);
  } else {
    if (textContent.startsWith("/start")) {
      textContent = textContent.replace("/start", "").trim();
    }

    await searchSongs(chatId, textContent);
  }
});

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  const [action, songTitle, page, songIndex] = data.split(":");

  if (action === "search") {
    await searchSongs(chatId, songTitle, parseInt(page));
  } else if (action === "download") {
    const songDetails = await fetchSongDetails(songTitle, limit, parseInt(page));
    await sendSong(songDetails.results[parseInt(songIndex)], chatId);
  }
});

async function searchSongs(chatId, textContent, page = 0) {
  bot.sendMessage(chatId, `🎵 *Searching for* "${textContent}" 🎵`, {
    parse_mode: "Markdown",
  });

  const songDetails = await fetchSongDetails(textContent, limit, page);

  let songs = songDetails.results;

  if (songs.length > 0) {
    await sendSongCrousels(songs, chatId, textContent, page);

    bot.sendMessage(chatId, `Page: ${page + 1}`, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "⬅️ Previous",
              callback_data: `search:${textContent}:${page - 1}`,
              disabled: page === 0,
            },
            {
              text: "➡️ Next",
              callback_data: `search:${textContent}:${page + 1}`,
              disabled: songs.length < limit,
            },
          ],
        ],
      },
    });
  } else {
    bot.sendMessage(
      chatId,
      "Sorry, I couldn't find any more songs. Try again or request more bots on @sopbots 🚀\n\n"
    );
  }
}

async function fetchSongDetails(songTitle, limit = 15, page = 0) {
  const response = await fetch(
    `${baseurl}search/songs?query=${encodeURIComponent(
      songTitle
    )}&limit=${limit}&page=${page}`
  );
  const data = await response.json();
  return data.data;
}

async function sendSong(song, chatId) {
  if (song) {
    let songDetails = `🎵 *${song.name}* 🎵\n\n`;
    songDetails += `🎤 *Artists*: ${song.artists.primary
      .map((artist) => `[${artist.name}](${artist.url})`)
      .join(", ")}\n`;
    songDetails += `📀 *Album*: [${song.album.name}](${song.album.url})\n`;
    songDetails += `🎶 *Language*: ${song.language}\n`;
    songDetails += `📅 *Year*: ${song.year}\n`;
    songDetails += `🔗 *URL*: [Listen on JioSaavn](${song.url})\n\n`;

    songDetails += `📻 *Play Count*: ${song.playCount}\n`;
    songDetails += `🕒 *Duration*: ${Math.floor(song.duration / 60)}:${
      song.duration % 60
    }\n`;
    songDetails += `🎵 *Label*: ${song.label}\n`;
    songDetails += `🎵 *Explicit Content*: ${
      song.explicitContent ? "Yes" : "No"
    }\n`;

    await bot.sendPhoto(chatId, song.image[2].url, {
      caption: songDetails,
      parse_mode: "Markdown",
    });
    await bot.sendAudio(chatId, song.downloadUrl.at(-1).url, {
      caption: `🎵 *${song.name}* 🎵\n\n📻 *Play Count*: ${
        song.playCount
      }\n🕒 *Duration*: ${Math.floor(song.duration / 60)}:${
        song.duration % 60
      }\n🎵 *Label*: ${song.label}\n🎵 *Explicit Content*: ${
        song.explicitContent ? "Yes" : "No"
      }\n🔗 *URL*: [Download MP3](${
        song.media_url
      })\n\n🚀 *Download the song and enjoy!* 🚀 @sopbots `,
      parse_mode: "Markdown",
      title: `${song.name}.mp3`,
    });
    await bot.sendPhoto(botlogger, song.image[2].url, {
      caption: songDetails,
      parse_mode: "Markdown",
    });
    await bot.sendAudio(botlogger, song.downloadUrl.at(-1).url, {
      caption: `🎵 *${song.name}* 🎵\n\n📻 *Play Count*: ${
        song.playCount
      }\n🕒 *Duration*: ${Math.floor(song.duration / 60)}:${
        song.duration % 60
      }\n🎵 *Label*: ${song.label}\n🎵 *Explicit Content*: ${
        song.explicitContent ? "Yes" : "No"
      }\n🔗 *URL*: [Download MP3](${
        song.media_url
      })\n\n🚀 *Download the song and enjoy!* 🚀  @sopbots `,
      parse_mode: "Markdown",
      title: `${song.name}.mp3`,
    });
  } else {
    bot.sendMessage(
      chatId,
      "Sorry, I couldn't find the song details. Try again or request more bots on @sopbots 🚀"
    );
  }
}

async function sendSongCrousels(songs, chatId, songTitle, page) {
  let carousel = songs.map((song, index) => {
    return [
      {
        text: song.name,
        callback_data: `download:${songTitle}:${page}:${index}`,
      },
    ];
  });

  await bot.sendMessage(chatId, "Select a song to download:", {
    reply_markup: {
      inline_keyboard: carousel,
    },
  });
}

// Export the POST function for Next.js App Router
export async function POST(request) {
  try {
    const body = await request.json();

    try {
       fetch("https://wh.manychat.com/tgwh/tg0o83f4yg73hfgi73f2g89938g/6190647327/c6a641c48af7a3cb2817d2de978d6fdc72dd8f16", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error("Error in POST function:", error);
      return NextResponse.json({ i: "Internal Server Error" });
      
    }
    console.log("Request Body:", body);
    bot.processUpdate(body);
    return NextResponse.json({ i: "ok" });
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json({ i: "Internal Server Error" });
  }
}

// Export the GET function for Next.js App Router
export async function GET() {
  return NextResponse.json({ i: "ok" });
}
