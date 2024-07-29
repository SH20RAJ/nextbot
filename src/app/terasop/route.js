import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import { downloadwithImage } from "./funcs";
import { PrismaClient } from "@prisma/client";

const token = process.env.TERASOP;
const bot = new TelegramBot(token);
const botlogger = "-1002221558664";
const soplogger = "-1002221686957";
const prisma = new PrismaClient();

// Function to check if user is a member of the channel
async function isUserInChannel(userId) {
  const channelId = "-1002023867798";
  try {
    const member = await bot.getChatMember(channelId, userId);
    return member.status !== "left";
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

    if (!body.message) {
      console.log("No message in the update");
      return NextResponse.json({}, { status: 200 });
    }

    const message = body.message;
    const chatId = message.chat.id;
    let textContent = message.text || (message.caption ? message.caption : "");

    if (!textContent) {
      console.log("No text or caption in the message");
      return NextResponse.json({}, { status: 200 });
    }

    console.log(chatId, textContent);

    // Check if user is a member of the channel
    if (!(await isUserInChannel(chatId))) {
      bot.sendMessage(
        chatId,
        "You must join the channel to use this bot. \n\nJoin the channel and try again: https://t.me/sopbots"
      );
      return NextResponse.json({}, { status: 200 });
    }

    if (textContent === "/start") {
      bot.sendMessage(
        chatId,
        "Send/Forward me a Terabox Link and I will give you the download link.... 🚀 \n Send Example Link :- https://teraboxapp.com/s/1EWkWY66FhZKS2WfxwBgd0Q"
      );

      bot.sendMessage(soplogger, ` #start User ${chatId} has started the bot.`);

      return NextResponse.json({}, { status: 200 });
    }

    // Handle the share command
    if (textContent === "/share") {
      const referralLink = `https://t.me/terasop_bot?start=${chatId}`;
      const referralCount = await prisma.person.count({
        where: { referedbyId: Number(chatId) },
      });
      // Send the referral link
      bot.sendMessage(
        chatId,
        `🎉 Share this link to your friends and get benefits for each friend who joins using your link! 🎉 \n\n ${referralLink} \n\n You have referred ${referralCount} users.`, { disable_web_page_preview : true}
      );

      // sharing message for frineds message to join the bot with the benefits of bot and refferal link
      bot.sendMessage(
        chatId,
        "🎉 Free Download and Stream Terabox Videos 🎉 \n\nCheckout :-  \n" +
          referralLink, {
            disable_web_page_preview : true
          }
      );

      // Log the referral
      bot.sendMessage(
        botlogger,
        `#reffers User ${chatId} has referred ${referralCount} users.`
      );

      return NextResponse.json({}, { status: 200 });
    }

    const referralCount = await prisma.person.count({
      where: { referedbyId: Number(chatId) },
    });

    if (referralCount < 1) {
      bot.sendMessage(
        chatId,
        `Share this bot with at least 1 friends group to get Access 🚀\nUse /share to get the details of how many persons you have shared the link and get your sharing link \n 
        \nYour Referral Link: https://t.me/terasop_bot?start=${chatId}
        `, {
          disable_web_page_preview : true
        }
      );
      return NextResponse.json({}, { status: 200 });
    }

    let referedbyId = null;

    // Check if the message contains the start command with a referral chatId
    if (textContent.startsWith("/start")) {
      const referralChatId = extractReferralChatId(textContent);

      if (referralChatId == chatId || referralChatId == null) {
        bot.sendMessage(chatId, "You can't refer yourself 🤦‍♂️");
        return NextResponse.json({}, { status: 200 });
      }
      const referer = await prisma.person.findUnique({
        where: { chatId: referralChatId },
      });
      if (referer) {
        referedbyId = referer.chatId;
      }

      let person = await prisma.person.findUnique({
        where: { chatId: String(chatId) },
      });
      if (!person) {
        person = await prisma.person.create({
          data: { chatId: String(chatId), referedbyId: Number(referedbyId) },
        });
      }

      bot.sendMessage(
        chatId,
        "Welcome to Terasop Bot! 🚀 \n You are successfully refereed by " +
          referedbyId +
          "👍 \n Type /share to share other users your own link 🎶"
      );

      // send message to the refered person
      bot.sendMessage(
        referedbyId,
        `🎉 Congrats! Your friend ${chatId} has joined the bot using your referral link! 🎉 \n
        You have referred ${referralCount} users. \n\n
        `, {
          disable_web_page_preview : true
        }
      );

      // Log the referral
      bot.sendMessage(
        soplogger,
        `#reffers User ${chatId} has been referred by ${referedbyId}.`
      );
    }

    // Check if the message contains a link
    if (textContent.includes("https://")) {
      const urls = extractUrls(textContent);
      if (urls) {
        urls.map((url) => {
          downloadwithImage(url, chatId);
        });
      }
      return NextResponse.json({}, { status: 200 });
    } else if (textContent === "hi") {
      bot.sendMessage(chatId, "Hi");
    } else {
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

  return NextResponse.json({}, { status: 200 });
}

export const GET = () => {
  return NextResponse.json({ message: "Hello" });
};

// Function to extract URL from message or caption
function extractUrls(text) {
  const regex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(regex);
  return matches ? matches : [];
}

// Function to extract referral chatId from the start command
function extractReferralChatId(text) {
  const startCommandRegex = /\/start (\d+)/;
  const match = text.match(startCommandRegex);
  return match ? match[1] : null;
}
