import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request,
) {
  const body = await request.json();
  const { 
    name,
    surname,
    email,
    password,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const hashedPassword = await bcrypt.hash(password, 12);
  const fullname = name[0].toUpperCase() + name.substring(1) + " " + surname[0].toUpperCase() + surname.substring(1);
  const User = await prisma.user.create({
    data: {
      email: email,
      hashedPassword: hashedPassword,
      name: name,
      surname: surname,
      fullname: fullname
    },
  })

  return NextResponse.json(User);
}