import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import { download , downloadwithImage } from "./funcs";

const token = process.env.TERASOP;

const bot = new TelegramBot(token);
const botlogger = "-1002221558664";


// Function to check if user is a member of the channel
async function isUserInChannel(userId) {
  const channelId = '-1002023867798';
  try {
    const member = await bot.getChatMember(channelId, userId);
    return member.status !== 'left';
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    await fetch(
      "https://wh.manychat.com/tgwh/tg0o83f4yg73hfgi73f2g89938g/6564625956/3cb9c43b300de42ccc337cc7d8b3e455ceef7d73",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    // Check if the update contains a message
    if (!body.message) {
      console.log("No message in the update");
      return NextResponse.json({}, { status: 200 }); // Acknowledge the request anyway
    }

    // Initialize message variables
    const message = body.message;
    let textContent = message.text || (message.caption ? message.caption : "");

    if (!textContent) {
      console.log("No text or caption in the message");
      return NextResponse.json({}, { status: 200 }); // Acknowledge the request anyway
    }

    const chatId = message.chat.id;
    console.log(chatId, textContent);

    if(!await isUserInChannel(chatId)){
      bot.sendMessage(chatId, "You must join the channel to use this bot. \n\nJoin the channel and try again: https://t.me/sopbots");
      return NextResponse.json({}, { status: 200 });
    }



    let bannedusers = await fetch("https://phpbot.sh20raj.com/soptoss/random.js");
    bannedusers = await bannedusers.text();

    if (bannedusers.includes(chatId)) {
      // bot.sendMessage(botlogger, `Banned User ${chatId}`);
      return NextResponse.json({}, { status: 200 });
    }

    // Check if the message contains a link
    if (textContent.includes("https://")) {
      const urls = extractUrls(textContent);
      // Check if the URL is from teraboxapp.com
      if (urls) {
        urls.map((url) => {
          // download(url , chatId);
          downloadwithImage(url , chatId);
        });
      }

      

      return NextResponse.json({}, { status: 200 });
      
    } else if (textContent === "hi") {
      // Send "Hi" as a response
      bot.sendMessage(chatId, "Hi");
    } else if (textContent === "/start") {
      // Send the start message as a response
      bot.sendMessage(
        chatId,
        "Send/Forward me a Terabox Link and I will give you the download link.... 🚀 \n Send Example Link :- https://teraboxapp.com/s/1EWkWY66FhZKS2WfxwBgd0Q"
      );
    } else {
      // Send a default response
      bot.sendMessage(
        chatId,
        "Send/Forward me a Terabox Link and I will give you the download link.... 🚀 \n Send Example Link :- https://teraboxapp.com/s/1EWkWY66FhZKS2WfxwBgd0Q"
      );
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const GET = () => {
  return NextResponse.json({ message: "Hello" });
};

// Function to extract URL from message or caption
function extractUrls(text) {
  // Regular expression to match URLs with various formats
  const regex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(regex);
  return matches ? matches : [];
}
