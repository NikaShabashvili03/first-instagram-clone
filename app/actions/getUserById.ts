import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export interface IUserByIdParams {
    userId: string,
}

export default async function getUserById(
  params: IUserByIdParams
) {
  try {
    const {
      userId
    } = params;

    if(!userId){
        return null
    }

     const user = await prisma.user.findUnique({
        where: {
          id: userId,
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
            },
            posts: {
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
                user: true
              }
            }
        }
      });


    return user;
  } catch (error: any) {
    // throw new Error(error);
    return undefined
  }
}
