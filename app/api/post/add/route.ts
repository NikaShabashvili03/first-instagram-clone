import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request): Promise<any> {
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return null
  }

  const body = await request.json();
  const { 
    title,
    image,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const User = await prisma.posts.create({
    data: {
      title,
      userId: currentUser.id,
      image
    },
  })

  return NextResponse.json(User);
}