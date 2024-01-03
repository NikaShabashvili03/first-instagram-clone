import prisma from "@/app/libs/prismadb";

export default async function getAllPosts() {
  try {
    const allPosts = await prisma.posts.findMany({
      include: {
        likes: true,
        comments: {
          include: {
            likes: true,
            user: true,
            reply: {
              include: {
                user: true
              }
            }
          }
        },
        user: true,
      }
    });


    if (!allPosts) {
      return null;
    }

    return allPosts
  } catch (error: any) {
    return null;
  }
}

