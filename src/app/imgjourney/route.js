
const TelegramBot = require('node-telegram-bot-api');


const token = process.env.IMGJOURNEYBOT;
const bot = new TelegramBot(token);





export const POST = async (req, res, next) => {
    let data = await req.json();
    const message = data.message;
    console.log(message);
    const chatId = message.chat.id;
    const textContent = message.text || (message.caption ? message.caption : '');
    
    if (textContent.toLowerCase() === 'hi') {
        bot.sendMessage(chatId, 'Hello!');
    } else {
        bot.sendMessage(chatId, 'Processing your request...');

        fetch("https://ask-me-api.vercel.app/api/nft", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content: textContent })
            })
            .then(response => response.json())
            .then(data => {
                const base64Data = data.nft_image; 
                console.log(data);
                const imageData = Buffer.from(base64Data, 'base64');
                bot.sendPhoto(chatId, imageData); 
                // bot.sendPhoto(chatId, imageData).then(() => {
                //     // Image sent, so we can hide the loading message
                //     bot.sendMessage(chatId, 'Request processed.');
                // }).catch(error => {
                //     console.error('Error sending image:', error);
                // });
            })
            .catch(error => {
                console.error('Error:', error);
                bot.sendMessage(chatId, 'An error occurred while processing your request');
            });
        // bot.sendMessage(chatId, 'Sorry, I only respond to "hi".');
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
