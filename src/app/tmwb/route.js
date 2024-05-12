
const TelegramBot = require('node-telegram-bot-api');


const token = process.env.TMWB;
const bot = new TelegramBot(token);
export const runtime = "edge";





export const POST = async (req, res, next) => {
    let data = await req.json();
    let manychat = fetch("https://wh.manychat.com/tgwh/tg0o83f4yg73hfgi73f2g89938g/6564625956/3cb9c43b300de42ccc337cc7d8b3e455ceef7d73",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })


    let stringdata = JSON.stringify(data);
    const regex = /imdb\.com\/title\/(tt\d+)/;
    const match = stringdata.match(regex);
    const imdbId = match ? match[1] : null;

    // const imdbPoster  = stringdata.match('https:\/\/m\.media-amazon\.com\/images\/[^"]+\.jpg')[0]
    
    console.log(imdbId); 



    const message = data.message || data.edited_message;
    console.log(message);

    const startMessage = "🌟 Welcome to @tmwbbot! 🌟\n\nSend me an IMDB link I will send you the stream URL or Type @imdbot then `space` then type the name of the movie then click on it to send 🚀";


    const chatId = message.chat.id;
    const textContent = message.text || (message.caption ? message.caption : '');
    bot.sendChatAction(chatId, 'typing')

    if (textContent === 'hi') {
        bot.sendMessage(chatId, 'Hello!');
    } else if(textContent == "/start"){
        bot.sendMessage(chatId, startMessage);
    } else {
        // let loaderMessage  = await bot.sendMessage(chatId, 'Processing your Image...');
        bot.sendChatAction(chatId, 'typing');
        if(imdbId){
            // bot.sendMessage(chatId, 'Watch Here :- https://vidsrc.to/embed/movie/'+imdbId);
            const imageUrl = 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg';

            // Create an inline keyboard with a button that opens the link
            const keyboard = {
                inline_keyboard: [
                    [
                        {
                            text: 'Watch Here',
                            url: `https://vidsrc.net/embed/${imdbId}`
                        }
                    ]
                ]
            };
        
            // Send a message with the inline keyboard and the image
            // bot.sendPhoto(chatId, imdbPoster, {
            //     caption: '<a href="https://www.imdb.com/title/'+imdbId+'">IMDB</a>',
            //     parse_mode: 'HTML',
            //     reply_markup: JSON.stringify(keyboard)
            // });

            bot.sendMessage(chatId, '<a href="https://www.imdb.com/title/'+imdbId+'">IMDB</a>', {
                parse_mode: 'HTML',
                reply_markup: JSON.stringify(keyboard)
            });

        } else {
            bot.sendMessage(chatId, "Try or Request more bots on @sopbots 🚀\n\n"+ startMessage);
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
