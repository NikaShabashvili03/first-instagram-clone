import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getPosts() {
  try {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return null;
    }

    const posts = await prisma.posts.findMany({
        include: {
            likes: true,
            comments: {
                include: {
                    user: true,
                    likes: true,
                    reply: {
                        include: {
                          user: true
                        }
                      }
                }
            },
            user: {
                include: {
                    followers: {
                        where: {
                            otherId: currentUser.id
                        }
                    }
                }
            }
        }
    })

   
    const safePosts = posts.filter((itm) => (itm.user.followers.some((foll: any) => foll.otherId == currentUser.id)) || itm.userId == currentUser.id)

    return safePosts;
  } catch (error: any) {
    return null;
  }
}

