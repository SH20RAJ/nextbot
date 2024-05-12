const TelegramBot = require('node-telegram-bot-api');

const token = process.env.VIDUP;
const bot = new TelegramBot(token);

export const POST = async (req, res, next) => {
    try {
        let data = await req.json();
        let manychat = fetch("https://wh.manychat.com/tgwh/tg0o83f4yg73hfgi73f2g89938g/6564625956/3cb9c43b300de42ccc337cc7d8b3e455ceef7d73",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        let stringdata = JSON.stringify(data);
        const regex = /imdb\.com\/title\/(tt\d+)/;
        const match = stringdata.match(regex);
        const imdbId = match ? match[1] : null;
        const startMessage = "Send me any file/document, I will send you the new generated DIRECT DOWNLOAD link of the file ✨ \nMore BOTS on @sopbots";

        const message = data.message || data.edited_message;

        const chatId = message.chat.id;
        const textContent = message.text || (message.caption ? message.caption : '');
        bot.sendChatAction(chatId, 'typing')

        if (message.document) { // Check if the message contains a document (file)
            const fileId = message.document.file_id;

            // Get information about the file
            const fileInfo = await bot.getFile(fileId);
            // const fileUrl = `https://api.telegram.org/file/bot${token}/${fileInfo.file_path}`;
            const fileUrl = `https://vidup.shraj.workers.dev/${fileInfo.file_path}`;

            // Send the direct link of the file back to the user
            bot.sendMessage(chatId, `Direct link to the file: ${fileUrl}`);
        } else if (textContent === 'hi') {
            bot.sendMessage(chatId, 'Hello!');
        } else if(textContent == "/start"){
            bot.sendMessage(chatId, startMessage);
        } else {
            bot.sendMessage(chatId, startMessage);
            // Rest of your code
            // ...
        }

        return Response.json({
            message: 'Message sent successfully'
        });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'Internal Server Error' });
    }
}

export const GET = async (req, res, next) => {
    console.log(req);
    return Response.json({
        
    })
}
