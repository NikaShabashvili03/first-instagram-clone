import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request,
) {
  const currentUser = await getCurrentUser()

  if(!currentUser){
    return null
  }

  const body = await request.json();
  const { 
    postId,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const post = await prisma.posts.delete({
    where: {
        id: postId,
    }
  })

  return NextResponse.json(post);
}