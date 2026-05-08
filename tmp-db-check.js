require('dotenv/config');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    console.log('db ok');
    return prisma.$disconnect();
  })
  .catch((err) => {
    console.error('db err', err.message);
    process.exit(1);
  });
