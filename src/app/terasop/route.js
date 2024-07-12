import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import CryptoJS from "crypto-js";
import { getintotouch } from "./funcs";

const token = process.env.TERASOP;
const bot = new TelegramBot(token);

export async function POST(req) {
  try {
    const body = await req.json();

    // console.log("Received update:", body);

    // Check if the update contains a message
    if (!body.message) {
      console.log("No message in the update");
      return NextResponse.json({}, { status: 200 }); // Acknowledge the request anyway
    }

    // console.log("Received message:", body.message);

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

    

    // Initialize message variables
    const message = body.message;
    let textContent = message.text || (message.caption ? message.caption : "");

    if (!textContent) {
      console.log("No text or caption in the message");
      return NextResponse.json({}, { status: 200 }); // Acknowledge the request anyway
    }

    const chatId = message.chat.id;
    console.log(chatId, textContent);

    // bot.getChatMember(chatId,"-1001135700451").then(() => { console.log("Exist"); }).catch((e) => { if(e.response.body.error_code == 400){ console.log("Not exist"); } } );

    // Check if the message contains a link
    if (textContent.includes("https://")) {
      const url = extractUrl(textContent);

      // Check if the URL is from teraboxapp.com
      if (url.includes("terabox")) {
        try {
          let id = url.split("/").pop();
          console.log("The ID is " + id);
          bot.sendChatAction(chatId, "typing");

          try {
             fetch('https://terabox.tech/api/upload?id=' + id + '&user=' + chatId);
          } catch (error) {
          }

          // New API endpoint and request body
          const apiUrl = "https://teraboxdownloader.in/api/video-downloader";
          const encryptedLink = encryptString(url); // Assuming you have the encryptString function from earlier

          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              Accept: "application/json, text/javascript, */*; q=0.01",
              "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
              "Cache-Control": "no-cache",
              "Content-Type": "application/json",
              Pragma: "no-cache",
              "Sec-Ch-Ua":
                '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
              "Sec-Ch-Ua-Mobile": "?0",
              "Sec-Ch-Ua-Platform": '"macOS"',
              "Sec-Fetch-Dest": "empty",
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Site": "same-origin",
              "X-Requested-With": "XMLHttpRequest",
            },
            referrer: `https://teraboxdownloader.in/video-downloader?link=${encodeURIComponent(
              url
            )}`,
            referrerPolicy: "strict-origin-when-cross-origin",
            body: JSON.stringify({ link: encryptedLink }),
            credentials: "include",
          });

          const data = await response.json();
          console.log("Response:", data);

          if (data.success && data.list.length > 0) {
            const fileInfo = data.list[0];
            const msgTemplate = `<b>Share this bot to keep this bot Working and Join @sopbots</b>\n<b>File Name:</b> ${
              fileInfo.fileName
            }\nOriginal Link: ${url}\n<b>File Size:</b> ${
              fileInfo.fileSize
            }\n<b>Uploaded At:</b> ${
              fileInfo.uploadedAt
            }\n <b>Download Link:</b> <a href="${
              fileInfo.downloadLink
            }">Download (if fast download not works)</a>\n <b>Watch Link:</b> <a href="https://teradl.shraj.workers.dev/?url=${encodeURIComponent(
              fileInfo.downloadLink
            )}">Watch</a>`;
            const options = {
              parse_mode: "HTML",
              reply_markup: {
                inline_keyboard: [
                  [
                    { text: "Fast Download", url: fileInfo.fastDownloadLink },
                    {
                      text: "Watch",
                      url: `https://teradl.shraj.workers.dev/?url=${encodeURIComponent(
                        fileInfo.fastDownloadLink
                      )}`,
                    },
                  ],
                ],
              },
            };
            bot.sendMessage(chatId, msgTemplate, options);

            try {
              let video = await fetch(
                "https://imagehippoo.shraj.workers.dev/?url=" +
                  fileInfo.fastDownloadLink
              );
              let videoData = await video.json();
              if (!videoData.data.view_url) {
                videoData = await fetch(
                  "https://imagehippoo.shraj.workers.dev/?url=" +
                    fileInfo.downloadLink
                );
                videoData = await videoData.json();
              }
              // bot.sendChatAction(chatId, "upload_video");
              // bot.sendVideo(chatId, videoData.video, { caption: videoData.caption });
              bot.sendMessage(chatId, videoData.data.view_url);
            } catch (error) {
              console.error("Error:", error);
              bot.sendMessage(
                chatId,
                "An error occurred while processing your request of Permanent URL under 50 MB"
              );
              // bot.sendMessage(chatId, fileInfo.downloadLink);
              bot.sendMessage(chatId, fileInfo.fastDownloadLink);

              await getintotouch({link:fileInfo.fastDownloadLink, chatId, id , url, msgTemplate});
            }
          } else {
            bot.sendMessage(chatId, "No download links found.");
          }
        } catch (error) {
          console.error("Error:", error);
          bot.sendMessage(
            chatId,
            "An error occurred while processing your request"
          );
        }
      }
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
function extractUrl(text) {
  const regex = /(https?:\/\/[^\s]+)/;
  const matches = text.match(regex);
  return matches ? matches[0] : "";
}

function encryptString(input) {
  const encryptionKey = "website:teraboxdownloader.in"; // Replace with your actual encryption key
  return CryptoJS.AES.encrypt(input, encryptionKey).toString();
}
