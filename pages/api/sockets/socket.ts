import { Server } from "socket.io";
import prisma from '@/app/libs/prismadb'

export default function handler(req: any, res: any){
  if(res.socket.server.io){
    console.log("Server alredy started!");
    res.end();
    return;
  }

  const io = new Server(res.socket.server,  {
    path: '/api/socket_io',
    addTrailingSlash: false,
    transports: ['websocket','polling'],
  })

  res.socket.server.io = io;

  io.on('connection', (socket) => {
    console.log("Connected: ", socket.id);
    


    socket.on('Follow', async (obj) => {
        await prisma.followers.create({
          data: {
            myId: obj.otherId,
            otherId: obj.myId
          }
        })
        await prisma.followings.create({
          data: {
            myId: obj.myId,
            otherId: obj.otherId
          }
        })
        io.emit('receive-Follow', obj);
    })

    socket.on('unFollow', async (obj) => {
        await prisma.followers.deleteMany({
          where: {
            myId: obj.otherId,
            otherId: obj.myId
          }
        })
        await prisma.followings.deleteMany({
          where: {
            myId: obj.myId,
            otherId: obj.otherId,
          }
        })
        io.emit('receive-unFollow', obj);
    })

    socket.on('Comment', async (obj) => {
      await prisma.comments.create({
        data: {
          userId: obj.userId,
          content: obj.content,
          postId: obj.postId
        }
      })

      io.emit('receive-Comment', obj)
    })

    socket.on('Reply', async (obj) => {
      await prisma.reply.create({
        data: {
          userId: obj.userId,
          content: obj.content,
          commentId: obj.commentId
        }
      })

      io.emit('receive-Reply', obj)
    })

    socket.on('LikePost', async (obj) => {
      await prisma.likes.create({
        data: {
          userId: obj.userId,
          postId: obj.postId
        }
      })

      io.emit('receive-LikePost', obj);
    })

    socket.on('disLikePost', async (obj) => {
      await prisma.likes.deleteMany({
        where: {
            userId: obj.userId,
            postId: obj.postId
        }
      })

      io.emit('receive-disLikePost', obj);
    })

    socket.on('LikeComment', async (obj) => {
      await prisma.likes.create({
        data: {
          userId: obj.userId,
          commentId: obj.commentId
        }
      })

      io.emit('receive-LikeComment', obj);
    })
    
    socket.on('disLikeComment', async (obj) => {
      await prisma.likes.deleteMany({
        where: {
            userId: obj.userId,
            commentId: obj.commentId
        }
      })

      io.emit('receive-disLikeComment', obj);
    })

    //  Disconnect
    socket.on('disconnect', async () => {
      console.log('🔥: A user disconnected');
      socket.disconnect();
    });
  });

  console.log("Socket server started successfully!");
  res.end();
}

