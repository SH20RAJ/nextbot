import { PrismaClient } from '@prisma/client';
import { sendMessages } from './sendMessages';
const TelegramBot = require('node-telegram-bot-api');

const prisma = new PrismaClient();
const token = process.env.TERASOP;
const bot = new TelegramBot(token);
const botlogger = "-1002221558664";
const testuserid = "1479193538";

export const POST = async (req) => {
  try {
    const { message } = await req.json();

    // Fetch distinct user IDs from the Video model
    const users = await prisma.video.findMany({
      distinct: ['user'],
      select: { user: true },
    });



    // Extract user IDs
    const userIds = users.map((user) => user.user);

    // return new Response(JSON.stringify({ userIds }), {
    //   status: 200,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    const result = await sendMessages({ message, users: userIds, token });
    console.log(result);

    return new Response(
      JSON.stringify({ message: 'Messages sent successfully', result }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in POST handler:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
