const TelegramBot = require("node-telegram-bot-api");

export async function sendMessages({ message, users, token }) {
  const bot = new TelegramBot(token);

  let succeededUsers = [];
  let failedUsers = [];

  const data = await Promise.all(
    users.map(async (userId) => {
      try {
        const user = await bot.sendMessage(userId, message);
        succeededUsers.push(userId);
      } catch (error) {
        console.error(`Error sending message to ${userId}:`, error);
        failedUsers.push(userId);
      }
    })
  );

  return { data, succeededUsers, failedUsers };
}
