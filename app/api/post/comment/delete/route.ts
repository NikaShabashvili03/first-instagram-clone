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
    commentId,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const comment = await prisma.comments.delete({
    where: {
        id: commentId,
    }
  })

  return NextResponse.json(comment);
}