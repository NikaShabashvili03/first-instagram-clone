'use client'
import Avatar from '@/app/components/Profile/Avatar'
import { useOnMountUnsafe } from '@/app/hooks/useOnMountUnsafe';
import socket from '@/app/libs/socket';
import { SafeUser } from '@/app/types/SafeUser';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import Reply from './Reply';
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface CommentsProps {
    comment: any,
    post: any,
    onClose: any
    currentUser: SafeUser | null,
    setComments: any,
    comments: any
}


export default function Comments({comments, comment, setComments, post, currentUser, onClose}: CommentsProps) {
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          content: '',
        }
      });

    const [likes, setLikes] = useState(comment?.likes);
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState(comment?.reply);


    const onSubmit = (data: any) => {
        setLoading(true);
        socket.emit('Reply', {
          content: data.content,
          commentId: comment?.id,
          userId: currentUser?.id,
          user: currentUser
        });
        reset();
        setLoading(false);
      }

      useOnMountUnsafe(() => {
        socket.on('receive-Reply', (obj) => {
          if(obj.commentId == comment?.id){
            setReply((prev: any) => [...prev, {
              content: obj.content,
              user: obj.user
            }])
          }
        })
    })

      useOnMountUnsafe(() => {
        socket.on('receive-disLikeComment', (obj) => {
            if(obj.commentId == comment?.id && obj.userId == currentUser?.id){
                setLikes(likes?.filter((item: any) => item.userId != obj.currentUser));
                setLoading(false)
            }
        })
    })


    const onLike = () => {
        setLoading(true)
        socket.emit('LikeComment', {
            commentId: comment.id,
            userId: currentUser?.id,
        })
    }
    const router = useRouter();

    const onDislike = () => {
        setLoading(true)
        socket.emit('disLikeComment', {
            commentId: comment.id,
            userId: currentUser?.id,
        })
    }

    const DeleteComment = () => {
        setLoading(true)
        axios.post('/api/post/comment/delete', {commentId: comment?.id}).then(() => {
          toast.success("Comment Deleted")
          router.refresh();
          setLoading(false)
          setComments(comments?.filter((itm: any) => itm.id != comment.id))
        }).catch(() => {
            toast.error('Something went wrong')
            setLoading(false)
        })
      }

    useEffect(() => {
        socket.on('receive-disLikeComment', (obj) => {
            if(obj.commentId == comment?.id && obj.userId == currentUser?.id){
                setLikes(likes?.filter((item: any) => item.userId != obj.currentUser));
                setLoading(false)
            }
        })
    },[])

    useOnMountUnsafe(() => {
        socket.on('receive-LikeComment', (obj) => {
            if(obj.commentId == comment?.id && obj.userId == currentUser?.id){
                setLikes((prev: any) => [...prev, {
                    commentId: obj.commentId,
                    userId: obj.userId
                }])
                setLoading(false)
            }
        })
    })

  return (
    <div className="ml-5 py-3 relative">
        <div className='flex justify-between items-center'>
            <span className="flex z-20 items-center">
                <Avatar small user={post?.user}/>
                <h2 className="ml-1 text-sm font-bold">{comment?.user?.fullname}</h2>
            </span>
            {comment?.userId == currentUser?.id && (
                <button disabled={loading} className="mr-5 text-sm" onClick={() => {DeleteComment()}}>
                    Delete
                </button>
            )}
        </div>
        <div className="ml-9 z-20 text-sm w-[85%] h-auto overflow-hidden">{comment?.content}</div>
        <div className='text-sm mt-1 text-end flex justify-between px-9 items-center'>
            {currentUser ? (
                <>
                    {!likes?.some((like: any) => like.userId == currentUser?.id) ? (
                            <div className='flex h-full w-auto justify-start items-center'>
                                 <button disabled={loading} onClick={() => {onLike()}} className="flex justify-center items-center">
                                    <BiLike size={25}/>
                                </button> 
                            </div>
                        ) : (
                            <div className='flex h-full w-auto justify-start items-center'>
                                <button disabled={loading} onClick={() => {onDislike()}} className="flex justify-center items-center">
                                    <BiSolidLike size={25}/>
                                </button> 
                            </div>
                        )}
                        <div className='w-full  flex'>
                            <form className='px-2 flex'>
                                <input placeholder='reply' {...register('content', {required: true})} className='border w-2/4 border-gray-300 pl-1'/>
                                <button onClick={handleSubmit(onSubmit)} disabled={loading} className='ml-1 text-sm border p-1 bg-gray-300 border-gray-50 hover:bg-gray-200 hover:border-gray-100'>Replay</button>
                            </form>
                        </div>
                </>
            
            ) : (
                <Link onClick={() => {onClose()}} href={'/auth'} className='flex h-full w-full justify-start items-center'>
                    <button disabled={loading} className="flex justify-center items-center">
                        <BiLike size={25}/>
                    </button> 
                </Link>
            )}
            <h2 className='font-bold flex'>{likes?.length} <span className='fond-medium ml-1'>likes</span></h2>
        </div>
        <div className='bg-black absolute left-[14px] top-[44px] h-[85px] w-[2px]'></div>
        <div className='mt-2'>
            {reply?.map((replys: any, i: any) => <Reply setReply={setReply} replys={reply} currentUser={currentUser} key={i} reply={replys}/>).reverse()}
        </div>
    </div>
  )
}
