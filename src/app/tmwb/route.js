
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
        bot.sendMessage(chatId, "🌟 Welcome to @tmwbbot! 🌟\n\nSend me an IMDB link I will send you the stream URL or Type @imdbot then `space` then type the name of the movie then click on it to send 🚀");
    } else {
        // let loaderMessage  = await bot.sendMessage(chatId, 'Processing your Image...');
        bot.sendChatAction(chatId, 'typing');
        if(imdbId){
            bot.sendMessage(chatId, 'https://vidsrc.to/embed/movie/'+imdbId);
        } else {
            bot.sendMessage(chatId, "Try or Request more bots on @sopbots 🚀");
        }

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
