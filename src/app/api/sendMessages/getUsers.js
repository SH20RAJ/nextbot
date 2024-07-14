import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers() {
      // Fetch distinct user IDs from the Video model
      const users = await prisma.video.findMany({
        distinct: ['user'],
        select: { user: true },
      });
  
  
  
      // Extract user IDs
      const userIds = users.map((user) => user.user);

      return userIds;
}
