// prisma/prisma.service.js
import { PrismaClient } from '@prisma/client';

class PrismaService {
  // client: PrismaClient;
  constructor() {
    this.client = new PrismaClient();
  }

  getPrismaClient() {
    return this.client;
  }
}

export default PrismaService;
