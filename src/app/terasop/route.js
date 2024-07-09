import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TERASOP;
const bot = new TelegramBot(token);

export async function POST(req) {
  try {
    const body = await req.json();

    console.log('Received update:', body);

    // Check if the update contains a message
    if (!body.message) {
      console.log('No message in the update');
      return NextResponse.json({}, { status: 200 });  // Acknowledge the request anyway
    }

    console.log('Received message:', body.message);

    await fetch("https://wh.manychat.com/tgwh/tg0o83f4yg73hfgi73f2g89938g/6564625956/3cb9c43b300de42ccc337cc7d8b3e455ceef7d73", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    // Initialize message variables
    const message = body.message;
    let textContent = message.text || (message.caption ? message.caption : '');

    if (!textContent) {
      console.log('No text or caption in the message');
      return NextResponse.json({}, { status: 200 });  // Acknowledge the request anyway
    }

    const chatId = message.chat.id;
    console.log(chatId, textContent);

    // Check if the message contains a link
    if (textContent.includes('https://')) {
      const url = extractUrl(textContent);

      // Check if the URL is from teraboxapp.com
      if (url.includes('terabox')) {
        try {
          let id = url.split('/').pop();
          console.log("The ID is " + id);
        //   await fetch('https://teraboxdl-4er1.onrender.com/api/upload?id=' + id + '&user=' + chatId);
          bot.sendChatAction(chatId, 'typing');
          const apiUrl = "https://ytshorts.savetube.me/api/v1/terabox-downloader";
          const requestBody = { url };
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
          });

          const data = await response.json();
            console.log('Response:', data);
          const videoInfo = data.response[0];
          const msgTemplate = `<b>Title:</b> ${videoInfo.title}\n<b>Thumbnail:</b> <a href="${videoInfo.thumbnail}">View Thumbnail</a>\n @sopbots - Useful Telegram Bots\nShare this bot to keep @terasop_bot active`;
          const options = {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [[
                { text: "Fast Download", url: videoInfo.resolutions["HD Video"] },
                { text: "Watch", url: `https://teradl.shraj.workers.dev/?url=${encodeURIComponent(videoInfo.resolutions["HD Video"])}` }
              ]]
            }
          };
          bot.sendMessage(chatId, msgTemplate, options);
        } catch (error) {
          console.error('Error:', error);
          bot.sendMessage(chatId, 'An error occurred while processing your request');
        }
      }
    } else if (textContent === 'hi') {
      // Send "Hi" as a response
      bot.sendMessage(chatId, 'Hi');
    } else if (textContent === '/start') {
      // Send the start message as a response
      bot.sendMessage(chatId, 'Send/Forward me a Terabox Link and I will give you the download link.... 🚀 \n Send Example Link :- https://teraboxapp.com/s/1EWkWY66FhZKS2WfxwBgd0Q');
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const GET =()=> {
  return NextResponse.json({ message: 'Hello' });
}

// Function to extract URL from message or caption
function extractUrl(text) {
  const regex = /(https?:\/\/[^\s]+)/;
  const matches = text.match(regex);
  return matches ? matches[0] : '';
}
