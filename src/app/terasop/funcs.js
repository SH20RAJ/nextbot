import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import CryptoJS from "crypto-js";
// import { main } from "./ping";

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

export async function downloadwithImage(url, chatId) {
  try {
    let id = url.split("/").pop();
    console.log("The ID is " + id);
    bot.sendChatAction(chatId, "typing");

    let watchlink =
      "https://player.terabox.tech/?url=https%3A%2F%2Fteraboxapp.com%2Fs%2F" +
      id;

    try {
      fetch("https://terabox.tech/api/upload?id=" + id + "&user=" + chatId);
    } catch (error) {}

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

    /*
    
    data2 = [
  {
    "resolutions": {
      "Fast Download": "https://d8.freeterabox.com/file/f75237a9e8ff64a7fe4881dd8587c8aa?fid=3003392469-250528-440150518260032&dstime=1723057045&rt=sh&sign=FDtAER-DCb740ccc5511e5e8fedcff06b081203-xCTtOhfHri2bxDZZ%2BlozRIggnPs%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=493592702799131904&dp-callid=0&r=660165119&sh=1&region=jp",
      "HD Video": "https://d.terabox.app/file/f75237a9e8ff64a7fe4881dd8587c8aa?fid=3003392469-250528-440150518260032&dstime=1723057045&rt=sh&sign=FDtAER-DCb740ccc5511e5e8fedcff06b081203-xCTtOhfHri2bxDZZ%2BlozRIggnPs%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=493592702799131904&dp-callid=0&r=660165119&sh=1&region=jp"
    },
    "thumbnail": "https://data.terabox.app/thumbnail/f75237a9e8ff64a7fe4881dd8587c8aa?fid=3003392469-250528-440150518260032&time=1723053600&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-Tnj9qWFhp1OeLvyrIQlmXvKPNQU%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=493592702799131904&dp-callid=0&size=c850_u580&quality=100&vuk=-&ft=video",
    "title": "BigBuckBunny.mp4"
  }
]

    */

    bot.sendMessage(chatId, data2.response[0].thumbnail);

    bot.sendMessage(botlogger, data2.response[0].resolutions["Fast Download"]);

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

    if (data2.response && data2.response.length > 0) {
      const videoTitle = data2.response[0].title;
      const hdVideoLink = data2.response[0].resolutions["HD Video"];

      bot.sendMessage(chatId, `Video Title: ${videoTitle}`);
      bot.sendMessage(chatId, `HD Video Link: ${hdVideoLink}`);
    } else {
      bot.sendMessage(chatId, "No video information found.");
    }

    bot.sendMessage(chatId, watchlink);

    bot.sendMessage(
      chatId,
      "If the bot is not working, please report on @sopbots, and try the app or website mentioned in @sopbots ."
    );
  } catch (error) {
    console.error("Error:", error);
    bot.sendMessage(
      chatId,
      "An error occurred while processing your request if its a correct link try resending it 🚀. Otherwise you can report on @sopbots"
    );
  } finally {
    bot.sendChatAction(chatId, "typing");
    // main();
  }
}

// export async function download(url, chatId) {
//   try {
//     let id = url.split("/").pop();
//     console.log("The ID is " + id);
//     bot.sendChatAction(chatId, "typing");

//     try {
//       fetch("https://terabox.tech/api/upload?id=" + id + "&user=" + chatId);
//     } catch (error) {}

//     // New API endpoint and request body
//     const apiUrl = "https://teraboxdownloader.in/api/video-downloader";
//     const encryptedLink = encryptString(url); // Assuming you have the encryptString function from earlier

//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         Accept: "application/json, text/javascript, */*; q=0.01",
//         "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
//         "Cache-Control": "no-cache",
//         "Content-Type": "application/json",
//         Pragma: "no-cache",
//         "Sec-Ch-Ua":
//           '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
//         "Sec-Ch-Ua-Mobile": "?0",
//         "Sec-Ch-Ua-Platform": '"macOS"',
//         "Sec-Fetch-Dest": "empty",
//         "Sec-Fetch-Mode": "cors",
//         "Sec-Fetch-Site": "same-origin",
//         "X-Requested-With": "XMLHttpRequest",
//       },
//       referrer: `https://teraboxdownloader.in/video-downloader?link=${encodeURIComponent(
//         "https://terabox.com/s/" + id
//       )}`,
//       referrerPolicy: "strict-origin-when-cross-origin",
//       body: JSON.stringify({ link: encryptedLink }),
//       credentials: "include",
//     });

//     const data = await response.json();
//     console.log("Response:", data);

//     if (data.success && data.list.length > 0) {
//       const fileInfo = data.list[0];
//       const msgTemplate = `<b>File Name:</b> ${
//         fileInfo.fileName
//       }\nOriginal Link: ${url}\n<b>File Size:</b> ${
//         fileInfo.fileSize
//       }\n<b>Uploaded At:</b> ${
//         fileInfo.uploadedAt
//       }\n<b>Download Link:</b> <a href="${
//         fileInfo.downloadLink
//       }">Download (if fast download not works)</a>\n<b>Watch Link:</b> <a href="https://teradl.shraj.workers.dev/?url=${encodeURIComponent(
//         fileInfo.fastDownloadLink
//       )}">Watch</a> \n <b>Share this bot to keep this bot Working and Join @sopbots</b>\n`;

//       const options = {
//         parse_mode: "HTML",
//         reply_markup: {
//           inline_keyboard: [
//             [
//               { text: "Fast Download", url: fileInfo.fastDownloadLink },
//               {
//                 text: "Watch",
//                 url: `https://codexdindia.blogspot.com/p/teradl.html?url=${encodeURIComponent(
//                   url
//                 )}`,
//               },
//             ],
//           ],
//         },
//       };

//       bot.sendMessage(chatId, msgTemplate, options);

//       bot.sendMessage(botlogger, msgTemplate, options);

//       try {
//         let video = await fetch(
//           "https://imagehippoo.shraj.workers.dev/?url=" +
//             fileInfo.fastDownloadLink
//         );
//         let videoData = await video.json();
//         if (!videoData.data.view_url) {
//           videoData = await fetch(
//             "https://imagehippoo.shraj.workers.dev/?url=" +
//               fileInfo.downloadLink
//           );
//           videoData = await videoData.json();
//         }
//         bot.sendMessage(chatId, videoData.data.view_url);
//         bot.sendMessage(botlogger, videoData.data.view_url);
//       } catch (error) {
//         console.error("Error:", error);
//         bot.sendMessage(
//           chatId,
//           "https://codexdindia.blogspot.com/p/teradl.html?url=" +
//             encodeURIComponent(url)
//         );
//         bot.sendMessage(
//           botlogger,
//           "https://codexdindia.blogspot.com/p/teradl.html?url=" +
//             encodeURIComponent(url)
//         );
//         bot.sendMessage(chatId, fileInfo.fastDownloadLink);
//         bot.sendMessage(botlogger, fileInfo.fastDownloadLink);
//       }
//     } else {
//       // bot.sendMessage(chatId, "No download links found.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     bot.sendMessage(chatId, "An error occurred while processing your request");
//   }
// }

// https://tera.instavideosave.com/?url=https://teraboxapp.com/s/1EWkWY66FhZKS2WfxwBgd0Q
