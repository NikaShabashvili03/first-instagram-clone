'use client'
import { SafeUser } from '@/app/types/SafeUser'
import React, { useEffect, useRef, useState } from 'react'
import Avatar from '../Profile/Avatar'
import Link from 'next/link'
import usePostModal from '@/app/hooks/usePostModal'
import { useRouter } from 'next/navigation'
import { BiLike, BiSolidLike } from "react-icons/bi";
import socket from '@/app/libs/socket'
import { IoIosMore } from "react-icons/io";
import { useOnMountUnsafe } from '@/app/hooks/useOnMountUnsafe'


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import Image from "next/image";
import axios from 'axios'
import toast from 'react-hot-toast'


interface PostCardProps {
    post: any,
    user: SafeUser,
    currentUser: SafeUser | null
}

export default function PostCard({
    post,
    user,
    currentUser
}: PostCardProps) { 
  const router = useRouter();
  const [likes, setLikes] = useState(post.likes);
  const initialized = useRef(false);
  const [loading, setLoading] = useState(false);



  const DeletePost = () => {
    setLoading(true)
    axios.post('/api/post/delete', {postId: post?.id}).then(() => {
      toast.success("Post Deleted")
      setLoading(false)

      router.refresh();
    }).catch(() => {
      toast.error('Something went wrong')
      setLoading(false)
    })
  }
  const onLike = () => {
    setLoading(true)
    socket.emit('LikePost', {
        postId: post.id,
        userId: currentUser?.id,
    })
  }
  const onDislike = () => {
    setLoading(true)
    socket.emit('disLikePost', {
        postId: post.id,
        userId: currentUser?.id,
    })
  }



    useOnMountUnsafe(() => {
        socket.on('receive-LikePost', (obj) => {
            if(post.id === obj.postId && obj.userId == currentUser?.id){
                setLikes((prev: any) => [...prev, {
                    postId: obj.postId,
                    userId: obj.userId,
                }])
                setLoading(false)
            }
        })
    })
  useOnMountUnsafe(() => {
    socket.on('receive-disLikePost', (obj) => {
        if(post.id === obj.postId && obj.userId == currentUser?.id){
            setLikes(likes?.filter((item: any) => item.userId != obj.userId))
            setLoading(false)
        }
    })
  })

  const {
    onOpen,
    setPost,
  } = usePostModal();

  return (
    <div className="p-8 flex items-center justify-center w-full">
        <div className="px-5 py-4 bg-white dark:bg-gray-800 shadow rounded-lg max-w-lg">
            <div className='flex justify-between items-center'>
                <Link className='flex mb-4' href={`/profile/${user.id}`}>
                    <Avatar user={user} medium/>
                    <div className="ml-2 flex justify-center items-center mt-0.5">
                        <span className="block font-medium text-base mr-2 leading-snug text-black dark:text-gray-100">{user.fullname}</span>
                        <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug"></span>
                    </div>
                </Link>
                {post?.userId == currentUser?.id && (
                        <button disabled={loading} className="mr-5" onClick={() => {DeletePost()}}>
                            Delete
                        </button>
                )}
            </div>
            <p className="text-gray-800 dark:text-gray-100 leading-snug mb-2 md:leading-normal">{post.title}</p>
            <div onClick={() => {
                if(!currentUser){
                    onOpen(); 
                    setPost(post)
                }
                }} className='group relative flex justify-center items-center cursor-pointer'>
                {/* <img src={`${post?.image}`} alt='' className='w-full mt-5 h-[450px]'></img> */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay
                    navigation={true}
                    modules={[ Navigation]}
                    className="mySwiper !w-full !aspect-square"
                  >
                    {post?.image?.map((val: string, key: any) => (
                      <SwiperSlide key={key}>
                        <Image
                            fill 
                            style={{ objectFit: 'cover' }} 
                            src={val} 
                            alt="House" 
                          />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                {currentUser && (
                    <div className='w-[80%] h-full z-40 hidden group-hover:flex justify-center items-center absolute left-50 top-0'>
                        {likes && !likes?.some((like: any) => like.userId === currentUser?.id) ? (
                            <div className='flex h-full w-full justify-around items-center'>
                                 <button disabled={loading} onClick={() => {onLike()}} className="flex justify-center items-center">
                                    <BiLike size={100}/>
                                </button> 
                                <button onClick={() => {
                                    onOpen();
                                    setPost(post)
                                }}>
                                    <IoIosMore size={100}/>
                                </button>
                            </div>
                        ) : (
                            <div className='flex h-full w-full justify-around items-center'>
                                <button disabled={loading} onClick={() => {onDislike()}} className="flex justify-center items-center">
                                    <BiSolidLike size={100}/>
                                </button> 
                                <button onClick={() => {
                                    onOpen();
                                    setPost(post)
                                }}>
                                    <IoIosMore size={100}/>
                                </button>
                            </div>
                        )
                    }
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center mt-5">
                {currentUser ? (
                    likes && !likes?.some((like: any) => like.userId === currentUser?.id) ? (
                        <span className="ml-2 text-gray-500 dark:text-gray-400  font-light">{likes.length} likes</span>
                    ) : (
                        <span className="ml-2 text-gray-500 dark:text-gray-400  font-light">{likes.length} likes</span>
                    )
                ) : (
                    <Link href={'/auth'} className="flex justify-center items-center">
                        <span className="ml-2 text-gray-500 dark:text-gray-400  font-light">{likes.length} likes</span>
                    </Link> 
                )}
                <button onClick={() => {
                    setPost(post);
                    onOpen();
                    router.refresh();
                }} className="ml-1 text-gray-500 dark:text-gray-400 font-light">{post.comments.length} comments</button>
            </div>
        </div>
    </div>
  )
}
