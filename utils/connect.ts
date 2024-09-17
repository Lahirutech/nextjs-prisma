import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate'


const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate())
};

declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton>;
  prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
