import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getAllUsers() {
  const currentUser = await getCurrentUser();

  try {
    const allUsers = await prisma.user.findMany({
      where: {
        NOT: {
          email: currentUser?.email
        }
      },
      include: {
        followers: {
          include: {
            other: true
          }
        },
        followings: {
          include: {
            other: true
          }
        }
      }
    });


    if (!allUsers) {
      return null;
    }

    return allUsers
  } catch (error: any) {
    return null;
  }
}

