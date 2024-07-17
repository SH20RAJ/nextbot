const jwt = require("jsonwebtoken");
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.REELSAVE;
const bot = new TelegramBot(token);
let botlogger = "-1002207414763";

//https://wh.manychat.com/tgwh/tg0o83f4yg73hfgi73f2g89938g/7371884410/fdcdfdd385640e06dfb8e101601c4696fb7c99eb
//@reelsop_bot && @sopbots
// instagram download bot

export const POST = async (req, res, next) => {
  let data = await req.json();
  let manychat = fetch(
    "https://wh.manychat.com/tgwh/tg0o83f4yg73hfgi73f2g89938g/7371884410/fdcdfdd385640e06dfb8e101601c4696fb7c99eb",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const message = data.message || data.edited_message;
  console.log(message);

  const startMessage =
    "Hello! ✨ \n I am @reelsop_bot bot that can help you download Instagram Reels 🥂. Just send me the link to the Reel you want to download and I will send you the download link and the video. You can also send me the Reel link in the caption of a photo or video. If you have any questions, feel free to ask!";

  const chatId = message.chat.id;
  const textContent = message.text || (message.caption ? message.caption : "");
  bot.sendChatAction(chatId, "typing");

  if (textContent === "hi") {
    bot.sendMessage(chatId, "Hello!");
  } else if (textContent == "/start") {
    bot.sendMessage(chatId, startMessage);
  } else {
    // bot.sendMessage(chatId, 'I am a bot, I do not understand human language');

    //match only instagram urls
    const url = textContent.match(/https?:\/\/(?:www\.)?instagram\.com\/reels\/[a-zA-Z0-9_-]+\/?/g
    );

    if (!url) {
      bot.sendMessage(chatId, "No URL found");

      return Response.json({
        message: "No URL found",
      });
    }

    console.log("url", url);

    const fetchurl = generateDownloadUrl(url[0]);
    console.log("fetchurl", fetchurl);

    let data = await fetch(
      fetchurl,{
        headers: {
          accept: "*",
          "accept-language": "en-US,en;q=0.9,hi;q=0.8",
          "access-control-allow-origin": "*",
          "cache-control": "no-cache",
          "content-type": "application/json",
          pragma: "no-cache",
          "sec-ch-ua":
            '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
        referrer: "https://insta.savetube.me/video-download-4k",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: JSON.stringify({ url: url[0] }), // Corrected the body to properly format the JSON
        method: "POST",
        mode: "cors",
        credentials: "include",
      }
    );

    data = await data.json();

    /*
    data = {
    "post_video_thumbnail": "https://scontent-ham3-1.cdninstagram.com/v/t51.29350-15/451435010_1006659510672790_3934504403925138424_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent-ham3-1.cdninstagram.com&_nc_cat=110&_nc_ohc=S2eGYH4-ABkQ7kNvgGNrKWI&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AYAcyOXpHI2z-3ypimoz0TcLMqjhXmFk35BN-OV4_dQlNQ&oe=669C9A40&_nc_sid=2999b8",
    "post_video_url": "https://scontent-ham3-1.cdninstagram.com/o1/v/t16/f2/m69/An84Ly7BSyNIms4OhtWDVIBz5shpxZ6U9H69T4gh8jQU5qEcF2ItTn71P6b-6xEIq_LzFK889WNjxx7DUN3d8UYA.mp4?efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuMTA4MC5iYXNlbGluZSJ9&_nc_ht=scontent-ham3-1.cdninstagram.com&_nc_cat=108&vs=419231007760222_1072761271&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HR3pBMkJJZDZFTF8teGNkQUVoc3hEVWExQmRKYnBSMUFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dDYno2UnF6dDg4OWtaWUJBQXhaaFNHOW54ZzNicV9FQUFBRhUCAsgBACgAGAAbABUAACbcqM%2BQh8WKQBUCKAJDMywXQBXdLxqfvncYFmRhc2hfYmFzZWxpbmVfMTA4MHBfdjERAHX%2BBwA%3D&_nc_rid=d3a2e2aa79&ccb=9-4&oh=00_AYAN9rfBoaVucY49Qw3-wXEj7bn87ywXxQedMXQqKDFO_Q&oe=6698A5D1&_nc_sid=2999b8&dl=1"
}
    
    */

    console.log("data", data);

    const options = {
      caption: "🚀 Download your video here ✨ - @sopbots && @reelsop_bot ",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Download",
              url: data.post_video_url,
            },
            {
              text: "Download Image",
              url: data.post_video_thumbnail,
            },
          ],
        ],
      },
    };

    try {
      let i = await bot.sendVideo(chatId, data.post_video_url, options);
      let i2 = await bot.sendVideo(botlogger, data.post_video_url, options);
    } catch (error) {
      console.log(error);
      bot.sendMessage(chatId, "To Big Video " + data.post_video_url, options);
      bot.sendMessage(
        botlogger,
        "To Big Video " + data.post_video_url,
        options
      );
    }

    // bot.sendPhoto(chatId, data.post_video_thumbnail, {
    //   caption: "Download your image here",
    //   parse_mode: "HTML",
    //   reply_markup: {
    //     inline_keyboard: [
    //       [
    //         {
    //           text: "Download",
    //           url: data.post_video_thumbnail,
    //         },
    //       ],
    //     ],
    //   },
    // });

    // bot.sendMediaGroup(chatId, [
    //   {
    //     type: "photo",
    //     media: data.post_video_thumbnail,
    //     caption: "Download your image here",
    //     parse_mode: "HTML",
    //     reply_markup: {
    //       inline_keyboard: [
    //         [
    //           {
    //             text: "Download",
    //             url: data.post_video_thumbnail,
    //           },
    //         ],
    //       ],
    //     },
    //   },
    //   {
    //     type: "video",
    //     media: data.post_video_url,
    //     caption: "Download your video here",
    //     parse_mode: "HTML",
    //     reply_markup: {
    //       inline_keyboard: [
    //         [
    //           {
    //             text: "Download",
    //             url: data.post_video_url,
    //           },
    //         ],
    //       ],
    //     },
    //   },
    // ]);
  }

  return Response.json({
    message: "Message sent successfully",
  });
};

export const GET = async (req, res, next) => {
  console.log(req);

  // Example usage:
  const instagramUrl = "https://www.instagram.com/reels/C9fQFa9voVP/";
  const downloadUrl = generateDownloadUrl(instagramUrl);
  console.log(downloadUrl);

  return Response.json({ downloadUrl });
};

function generateJwtToken() {
  const secret =
    "333333696969696_____THISHASTOBEVERYSECRET584958495849584958495475847584758475847584758475847584848488";
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ payload: "User" }, secret, { expiresIn: "30s" });
  return token;
}

function generateDownloadUrl(instagramUrl) {
  const token = generateJwtToken();
  const baseUrl = "https://insta.savetube.me/downloadPostVideo";
  return `${baseUrl}?token=${token}`;
}
