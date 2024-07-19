import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import CryptoJS from "crypto-js";

const token = process.env.TERASOP;

const bot = new TelegramBot(token);
const botlogger = "-1002221558664";

export function encryptString(input) {
  const encryptionKey = "website:teraboxdownloader.in"; // Replace with your actual encryption key
  return CryptoJS.AES.encrypt(input, encryptionKey).toString();
}

export const getintotouch = async ({ link, chatId, id, url, msgTemplate }) => {
  try {
    const formData = new FormData();
    formData.append("chatId", chatId);
    formData.append("link", link);
    formData.append("id", id);
    formData.append("url", url);
    formData.append("msgTemplate", msgTemplate);

    console.log("Sending to getintotouch", formData);

    await fetch("https://getintotouch.sh20raj.com/api.php?id=-1002221558664", {
      method: "POST",
      body: formData,
    });

    const formData2 = new FormData();
    formData2.append("direct", link);
    await fetch("https://getintotouch.sh20raj.com/api.php?id=-1002221558664", {
      method: "POST",
      body: formData2,
    });

    console.log("Sent to getintotouch");
  } catch (error) {
    console.error("Error sending to getintotouch:", error);
  }
};

export async function download(url, chatId) {
  try {
    let id = url.split("/").pop();
    console.log("The ID is " + id);
    bot.sendChatAction(chatId, "typing");

    try {
      fetch("https://terabox.tech/api/upload?id=" + id + "&user=" + chatId);
    } catch (error) {}

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
        "https://terabox.com/s/" + id
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
      }\n<b>Download Link:</b> <a href="${
        fileInfo.downloadLink
      }">Download (if fast download not works)</a>\n<b>Watch Link:</b> <a href="https://teradl.shraj.workers.dev/?url=${encodeURIComponent(
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
                url: `https://codexdindia.blogspot.com/p/teradl.html?url=${encodeURIComponent(
                  url
                )}`,
              },
            ],
          ],
        },
      };

      bot.sendMessage(chatId, msgTemplate, options);

      bot.sendMessage(botlogger, msgTemplate, options);

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
        bot.sendMessage(chatId, videoData.data.view_url);
        bot.sendMessage(botlogger, videoData.data.view_url);
      } catch (error) {
        console.error("Error:", error);
        bot.sendMessage(
          chatId,
          "https://codexdindia.blogspot.com/p/teradl.html?url=" +
            encodeURIComponent(url)
        );
        bot.sendMessage(
          botlogger,
          "https://codexdindia.blogspot.com/p/teradl.html?url=" +
            encodeURIComponent(url)
        );
        bot.sendMessage(chatId, fileInfo.fastDownloadLink);
        bot.sendMessage(botlogger, fileInfo.fastDownloadLink);
      }
    } else {
      bot.sendMessage(chatId, "No download links found.");
    }
  } catch (error) {
    console.error("Error:", error);
    bot.sendMessage(chatId, "An error occurred while processing your request");
  }
}

export async function downloadwithImage(url, chatId) {
  try {
    let id = url.split("/").pop();
    console.log("The ID is " + id);
    bot.sendChatAction(chatId, "typing");

    try {
      fetch("https://terabox.tech/api/upload?id=" + id + "&user=" + chatId);
    } catch (error) {}

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
        "https://terabox.com/s/" + id
      )}`,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: JSON.stringify({ link: encryptedLink }),
      credentials: "include",
    });

    const data = await response.json();
    console.log("Response:", data);

    const response2 = await fetch(
      "https://ytshorts.savetube.me/api/v1/terabox-downloader",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,hi;q=0.8",
          "cache-control": "no-cache",
          "content-type": "application/json",
          pragma: "no-cache",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
        referrerPolicy: "no-referrer",
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({ url: url }),
      }
    );

    const data2 = await response2.json();

    if (data.success && data.list.length > 0) {
      const fileInfo = data.list[0];
      const msgTemplate = `<b>Share this bot to keep this bot Working and Join @sopbots</b>\n<b>File Name:</b> ${
        fileInfo.fileName
      }\nOriginal Link: ${url}\n<b>File Size:</b> ${
        fileInfo.fileSize
      }\n<b>Uploaded At:</b> ${
        fileInfo.uploadedAt
      }\n<b>Download Link:</b> <a href="${
        fileInfo.downloadLink
      }">Download (if fast download not works)</a>\n<b>Watch Link:</b> <a href="https://teradl.shraj.workers.dev/?url=${encodeURIComponent(
        fileInfo.downloadLink
      )}">Watch</a> `;

      const options = {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Fast Download", url: fileInfo.fastDownloadLink },
              {
                text: "Watch",
                url: `https://codexdindia.blogspot.com/p/teradl.html?url=${encodeURIComponent(
                  url
                )}`,
              },
            ],
          ],
        },
      };

      bot.sendPhoto(chatId, data2.response[0].thumbnail, {
        caption: msgTemplate,
        ...options,
      });

      bot.sendPhoto(botlogger, data2.response[0].thumbnail, {
        caption: msgTemplate,
        ...options,
      });

      try {
        bot.sendVideo(chatId, fileInfo.fastDownloadLink);
      bot.sendVideo(botlogger, fileInfo.fastDownloadLink);
      } catch (error) {
        bot.sendVideo(chatId,  "https://phpbot.sh20raj.com/api/video.php?url=" . encodeURIComponent(fileInfo.fastDownloadLink));
        bot.sendVideo(botlogger,  "https://phpbot.sh20raj.com/api/video.php?url=" . encodeURIComponent(fileInfo.fastDownloadLink));
      }
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
        bot.sendMessage(chatId, videoData.data.view_url);
        bot.sendMessage(botlogger, videoData.data.view_url);
      } catch (error) {
        console.error("Error:", error);
        // bot.sendMessage(
        //   chatId,
        //   "https://codexdindia.blogspot.com/p/teradl.html?url=" +
        //     encodeURIComponent(url)
        // );
        // bot.sendMessage(
        //   botlogger,
        //   "https://codexdindia.blogspot.com/p/teradl.html?url=" +
        //     encodeURIComponent(url)
        // );
        // bot.sendMessage(chatId, fileInfo.fastDownloadLink);
        // bot.sendMessage(botlogger, fileInfo.fastDownloadLink);
      }
    } else {
      bot.sendMessage(chatId, "No download links found.");
    }
  } catch (error) {
    console.error("Error:", error);
    bot.sendMessage(
      chatId,
      "An error occurred while processing your request if its a correct link try resending it 🚀. Otherwise you can report on @sopbots"
    );
  }
}
