import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request,
): Promise<any> {
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return null
  }

  const body = await request.json();
  const { 
    replyId,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const reply = await prisma.reply.delete({
    where: {
        id: replyId,
    }
  })

  return NextResponse.json(reply);
}