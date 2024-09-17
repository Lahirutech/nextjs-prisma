import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


export const GET = async () => {
  try {

    const users = await prisma.user.findMany();
    return new NextResponse(JSON.stringify({ message: users, status: 200 }));
  } catch (err) {
    console.log("error", err);
    return new NextResponse(
      JSON.stringify({ message: "get users failed", status: 500 })
    );
  }
};
