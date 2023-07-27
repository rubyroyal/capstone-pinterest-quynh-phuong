// prisma/prisma.service.cjs
const { PrismaClient } = require('@prisma/client');

class PrismaService {
  // client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
  }

  getPrismaClient() {
    return this.client;
  }
}

module.exports = PrismaService;
