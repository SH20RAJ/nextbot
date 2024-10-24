import { NextResponse } from "next/server";
import TelegramBot from "node-telegram-bot-api";
import CryptoJS from "crypto-js";
// import { main } from "./ping";

const token = process.env.TERASOP;

const bot = new TelegramBot(token);
const botlogger = "-1002434779205";

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
      const msgTemplate = `<b>File Name:</b> ${
        fileInfo.fileName
      }\nOriginal Link: ${url}\n<b>File Size:</b> ${
        fileInfo.fileSize
      }\n<b>Uploaded At:</b> ${
        fileInfo.uploadedAt
      }\n<b>Download Link:</b> <a href="${
        fileInfo.downloadLink
      }">Download (if fast download not works)</a>\n<b>Watch Link:</b> <a href="https://teradl.shraj.workers.dev/?url=${encodeURIComponent(
        fileInfo.fastDownloadLink
      )}">Watch</a> \n <b>Share this bot to keep this bot Working and Join @sopbots</b>\n`;

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
      // bot.sendMessage(chatId, "No download links found.");
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

    let watchlink =
      "https://player.terabox.tech/?url=https%3A%2F%2Fteraboxapp.com%2Fs%2F" +
      id;

    // bot.sendPhoto(
    //   chatId,
    //   "https://avatars.githubusercontent.com/u/66713844?v=4"
    // );

    let msg = `
  <b>Original Link:</b> <a href="https://teraboxapp.com/s/${id}">https://teraboxapp.com/s/${id}</a>
  <a href="https://www.1024terabox.com/sharing/embed?surl=${id.slice(1)}&autoplay=true&mute=false">Stream Embeded Video</a>
  <b>Watch Link:</b> <a href="${watchlink}">${watchlink}</a>
  <b>Try our Website:</b> <a href="https://www.terabox.tech/">https://www.terabox.tech/</a>
  `;

    bot.sendMessage(chatId, msg , { parse_mode: "HTML" });
    // bot.sendMessage(botlogger, "WatchLink :- " + watchlink);

    try {
      let api = "https://teraboxapi2.darkhacker7301.workers.dev/?url=" + url;
      console.clear();
      console.log("API :- " + api);

      let response = await fetch(api);
      let data = await response.json();

      console.log("Data :- " + data);

      console.log("Thumbnail :- " + data.response[0].thumbnail);
      // bot.sendPhoto(chatId, data.response[0].thumbnail);

      bot.sendMessage(
        chatId,
        `Title: <b>${data.response[0].title}</b>\n
        Fast Download: <a href="${data.response[0].resolutions["Fast Download"]}">Fast Download Link</a>\n
        HD Video: <a href="${data.response[0].resolutions["HD Video"]}">HD Video Link</a>\n
        Thumbnail: <a href="${data.response[0].thumbnail}">Thumbnail Link</a>\n
        Stream Video: <a href="https://www.1024terabox.com/sharing/embed?surl=${id.slice(1)}&autoplay=true&mute=false">Stream Video</a>\n
        \nOriginal Link :- ${"https://teraboxapp.com/s/"+id}\n
        \nWatchLink :- ${watchlink}`,
        { parse_mode: "HTML" }
      );

      bot.sendMessage(botlogger, `Title: <b>${data.response[0].title}</b>\n
        Fast Download: <a href="${data.response[0].resolutions["Fast Download"]}">Fast Download Link</a>\n
        HD Video: <a href="${data.response[0].resolutions["HD Video"]}">HD Video Link</a>\n
        Thumbnail: <a href="${data.response[0].thumbnail}">Thumbnail Link</a>\n
        \nOriginal Link :- ${"https://teraboxapp.com/s/"+id}\n
        \nWatchLink :- ${watchlink}`,
        { parse_mode: "HTML" }
      );

      /*
        
       data =  {
  "response": [
    {
      "resolutions": {
        "Fast Download": "https://d8.freeterabox.com/file/bc6459711c653e1415fb93b12cf2e23b?fid=4400976991365-250528-313482977156770&dstime=1728668764&rt=sh&sign=FDtAER-DCb740ccc5511e5e8fedcff06b081203-c6BUmSGbWD5ZkRb0jD9jlHQhIPQ%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=8917506082591529127&dp-callid=0&r=950206717&sh=1&region=jp",
        "HD Video": "https://d.terabox.app/file/bc6459711c653e1415fb93b12cf2e23b?fid=4400976991365-250528-313482977156770&dstime=1728668764&rt=sh&sign=FDtAER-DCb740ccc5511e5e8fedcff06b081203-c6BUmSGbWD5ZkRb0jD9jlHQhIPQ%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=8917506082591529127&dp-callid=0&r=950206717&sh=1&region=jp"
      },
      "thumbnail": "https://data.terabox.app/thumbnail/bc6459711c653e1415fb93b12cf2e23b?fid=4400976991365-250528-313482977156770&time=1728666000&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-cVHkj%2BDiz0NnRwe7sFwwfv%2BX%2FuM%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=8917506082591529127&dp-callid=0&size=c850_u580&quality=100&vuk=-&ft=video",
      "title": "2023-02-10-22-16-24."
    }
  ]
}
        */
      // bot.sendMessage(chatId, "sending messsssage");

      const msgTemplate = `<b>Share this bot Using /share </b>
\n<b>File Name:</b> ${data.response[0].title}
\nOriginal Link: ${url}
\n<b>File Size:</b> ${data.response[0].fileSize}
  \n<b>Download Link:</b> <a href="${data.response[0].resolutions["Fast Download"]}">Download (if fast download not works)</a>\n<b>Watch Link:</b>
\n<a href="${watchlink}">Watch</a>
\n<b>Share this bot to keep this bot Working and Join @sopbots</b>
\n Watch Link: ${watchlink}
\n Get App Access :- https://forms.gle/SWxyKYYxZyVLbcQ77 (After filling the form you will get the app access link given below)
\n Download App :- https://play.google.com/store/apps/details?id=co.median.android.nydowl (open in chrome for download)
`;

      console.log("MsgTemplate :- " + msgTemplate);

      const options = {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Fast Download",
                url:
                  "https://player.terabox.tech/ads?url=" +
                  fileInfo.fastDownloadLink,
              },
              {
                text: "Watch",
                url: watchlink,
              },
            ],
          ],
        },
      };

      // bot.sendPhoto(chatId, data.response[0].thumbnail, {
      //   caption: msgTemplate,
      //   ...options,
      // });

      bot.sendMessage(chatId, "sending message");

      bot.sendMessage(chatId, msgTemplate, options);

      bot.sendMessage(botlogger, "sentmessage");

      // bot.sendVideo(chatId, data.response[0].resolutions["Fast Download"]);
      // bot.sendVideo(chatId, data.response[0].resolutions["HD Video"]);
    } catch (error) {}

    // try {
    //   fetch("https://terabox.tech/api/upload?id=" + id + "&user=" + chatId);
    // } catch (error) {}
  } catch (error) {
    console.error("Error:", error);
    bot.sendMessage(chatId, "An error occurred while processing your request");
  }
}

export async function downloadwithImageprev(url, chatId) {
  try {
    let id = url.split("/").pop();
    console.log("The ID is " + id);
    bot.sendChatAction(chatId, "typing");

    let watchlink =
      "https://player.terabox.tech/?url=https%3A%2F%2Fteraboxapp.com%2Fs%2F" +
      id;

    bot.sendMessage(chatId, "Link :- " + watchlink);

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

      const msgTemplate = `<b>Share this bot Using /share </b>
      \n<b>File Name:</b> ${fileInfo.fileName}
      \nOriginal Link: ${url}
      \n<b>File Size:</b> ${fileInfo.fileSize}
      \n<b>Uploaded At:</b> ${fileInfo.uploadedAt}
      \n<b>Download Link:</b> <a href="${fileInfo.downloadLink}">Download (if fast download not works)</a>\n<b>Watch Link:</b>
      \n<a href="${watchlink}">Watch</a>
      \n<b>Share this bot to keep this bot Working and Join @sopbots</b>
      \n Watch Link: ${watchlink}
      \n Get App Access :- https://forms.gle/SWxyKYYxZyVLbcQ77 (After filling the form you will get the app access link given below)
      \n Download App :- https://play.google.com/store/apps/details?id=co.median.android.nydowl (open in chrome for download)
      `;

      const options = {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Fast Download",
                url:
                  "https://player.terabox.tech/ads?url=" +
                  fileInfo.fastDownloadLink,
              },
              {
                text: "Watch",
                url: watchlink,
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

      // bot.sendMessage("1479193538",  "before https://phpbot.sh20raj.com/api/video.php?url=" + encodeURIComponent(fileInfo.fastDownloadLink));

      try {
        bot.sendVideo(chatId, fileInfo.fastDownloadLink);
        bot.sendVideo(botlogger, fileInfo.fastDownloadLink);
        // bot.sendVideo(chatId,  "https://phpbot.sh20raj.com/api/video.php?url=" + encodeURIComponent(fileInfo.fastDownloadLink));
        // bot.sendVideo(botlogger,  "https://phpbot.sh20raj.com/api/video.php?url=" + encodeURIComponent(fileInfo.fastDownloadLink));
        // bot.sendMessage("1479193538",  "top https://phpbot.sh20raj.com/api/video.php?url=" + encodeURIComponent(fileInfo.fastDownloadLink));
      } catch (error) {
        bot.sendVideo(
          chatId,
          "https://phpbot.sh20raj.com/api/video.php?url=" +
            encodeURIComponent(fileInfo.fastDownloadLink)
        );
        bot.sendVideo(
          botlogger,
          "https://phpbot.sh20raj.com/api/video.php?url=" +
            encodeURIComponent(fileInfo.fastDownloadLink)
        );
        // bot.sendMessage("1479193538",  "https://phpbot.sh20raj.com/api/video.php?url=" + encodeURIComponent(fileInfo.fastDownloadLink));
      }

      // bot.sendMessage(
      //   chatId,
      //   `✨ Access to Preview Version of Premium @TeraSop_bot (Video Player Online) \n Use /share and share to 5 of your friends to keep the video watching feature on after the access ends  :- https://codexdindia.blogspot.com/p/terabox-downloader.html?url=${url}`
      // );

      // promote the website https://www.terabox.tech/  for downloading, viewing and enbedding the videos with no limits

      bot.sendMessage(
        chatId,
        `Visit https://www.terabox.tech/ for downloading, viewing and embedding the videos with no filesize, bandwidth, etc limits 🚀 
        Download Chrome Extension for Fast Downloading and Embedding the Videos in your Website 🚀

        \nLink to Your Video :- ${watchlink}`
      );

      // send message that you can earn money by sharing the bot with your friends or social media for more info use /share

      // bot.sendMessage(
      //   chatId,
      //   `🎉 Share this link to your friends and get benefits for each friend who joins using your link! 🎉 \n\n Your Referral Link is below, Share this to your friends or on social media to earn money 💸 ($1 or ₹100 / 1k Users) \n https://t.me/terasop_bot?start=${chatId}  \n\n. Check => /share 🎶`,
      //   { disable_web_page_preview: true }
      // );
    } else {
      // bot.sendMessage(chatId, "No download links found.");
    }
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

// https://tera.instavideosave.com/?url=https://teraboxapp.com/s/1EWkWY66FhZKS2WfxwBgd0Q
