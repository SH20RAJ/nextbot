
const TelegramBot = require('node-telegram-bot-api');


const token = process.env.TMWB;
const bot = new TelegramBot(token);





export const POST = async (req, res, next) => {
    let data = await req.json();


    let stringdata = JSON.stringify(data);
    const regex = /imdb\.com\/title\/(tt\d+)/;
    const match = stringdata.match(regex);
    const imdbId = match ? match[1] : null;
    
    console.log(imdbId); 



    const message = data.message || data.edited_message;
    console.log(message);


    const chatId = message.chat.id;
    const textContent = message.text || (message.caption ? message.caption : '');
    bot.sendChatAction(chatId, 'typing')

    if (textContent === 'hi') {
        bot.sendMessage(chatId, 'Hello!');
    } else if(textContent == "/start"){
        bot.sendMessage(chatId, "🌟 Welcome to @ImgJourneyBot! 🌟\n\nI'm here to create magical images using prompts. Just send me a prompt, and I'll craft a unique image based on it. Let's embark on an image journey together! 🖼️\n\nJoin @SopBots to request new features or suggest new bots. We're always eager to hear from you! 🚀");
    } else {
        // let loaderMessage  = await bot.sendMessage(chatId, 'Processing your Image...');
        bot.sendChatAction(chatId, 'typing');

        bot.sendMessage(chatId, 'https://vidsrc.to/embed/movie/'+imdbId);
    }

    return Response.json({
        message: 'Message sent successfully'
    });
}







export const GET = async (req, res, next) => {
    console.log(req);
    return Response.json({
        
    })
}
