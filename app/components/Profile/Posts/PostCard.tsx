import { useOnMountUnsafe } from '@/app/hooks/useOnMountUnsafe';
import usePostModal from '@/app/hooks/usePostModal';
import socket from '@/app/libs/socket';
import { SafeUser } from '@/app/types/SafeUser'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { IoIosMore } from 'react-icons/io';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import Image from "next/image";



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
  const {
    onOpen,
    setPost,
  } = usePostModal();

  const [likes, setLikes] = useState(post.likes);
  const [loading, setLoading] = useState(false);

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

//   useEffect(() => {
//     if(!initialized.current){
//         initialized.current = true
//         socket.on('receive-LikePost', (obj) => {
//             if(post.id === obj.postId){
//                 setLikes((prev: any) => [...prev, {
//                     postId: obj.postId,
//                     userId: obj.userId,
//                 }])
//                 setLoading(false)
//             }
//         })
//     }
//   }, [])   
//   useEffect(() => {
//     socket.on('receive-LikePost', (obj) => {
//         if(post.id === obj.postId){
//             setLikes((prev: any) => [...prev, {
//                 postId: obj.postId,
//                 userId: obj.userId,
//             }])
//             setLoading(false)
//         }
//     })
//   },[])
  useOnMountUnsafe(() => {
    socket.on('receive-LikePost', (obj) => {
        if(post.id === obj.postId){
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
            setLikes(likes.filter((item: any) => item.postId == obj.id && item.userId == obj.userId))
            setLoading(false)
        }
    })
  })
  
//   useEffect(() => {
//     socket.on('receive-disLikePost', (obj) => {
//         if(post.id === obj.postId){
//             setLikes(likes.filter((item: any) => item.postId == obj.id && item.userId == obj.userId))
//             setLoading(false)
//         }
//     })
//   },[])

//   useEffect(() => {
//     if(initialized.current){
//         initialized.current = true
//         socket.on('receive-disLikePost', (obj) => {
//             if(post.id === obj.postId){
//                 setLikes(likes.filter((item: any) => item.postId == obj.id && item.userId == obj.userId))
//                 setLoading(false)
//             }
//         })
//     }
//   }, [])

  const router = useRouter();
  return (
    <div onClick={() => {
      if(!currentUser){
        onOpen(); 
        setPost(post)
      }
    }} className="group bg-gray-50 dark:bg-gray-900 flex items-center mt-5 justify-center w-full relative">
        {/* <img src={post?.image} alt='' className='w-full'></img> */}
          <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              autoplay
              className="mySwiper !w-full !aspect-square"
            >
              {post?.image?.map((val: string, key: any) => (
                <SwiperSlide key={key}>
                  <Image
                      fill 
                      style={{ objectFit: 'cover' }} 
                      src={val} 
                      alt="House" 
                      className='w-full'
                    />
                </SwiperSlide>
              ))}
          </Swiper>
        {currentUser && (
                    <div className='w-full h-full z-40  hidden group-hover:flex justify-center items-center absolute left-0 top-0'>
                        {!likes?.some((like: any) => like.userId === currentUser?.id) ? (
                            <div className='flex h-full w-full justify-around items-center'>
                                 <button disabled={loading} onClick={() => {onLike()}} className="flex justify-center items-center">
                                    <BiLike className="sm:w-[100px] w-[50px] h-[50px] sm:h-[100px]"/>
                                </button> 
                                <button onClick={() => {
                                    onOpen();
                                    setPost(post)
                                }}>
                                    <IoIosMore className="sm:w-[100px] w-[50px] h-[50px] sm:h-[100px]"/>
                                </button>
                            </div>
                        ) : (
                            <div className='flex h-full w-full justify-around items-center'>
                                <button disabled={loading} onClick={() => {onDislike()}} className="flex justify-center items-center">
                                    <BiSolidLike className="sm:w-[100px] w-[50px] h-[50px] sm:h-[100px]"/>
                                </button> 
                                <button onClick={() => {
                                    onOpen();
                                    setPost(post)
                                }}>
                                    <IoIosMore className="sm:w-[100px] w-[50px] h-[50px] sm:h-[100px]"/>
                                </button>
                            </div>
                        )
                    }
                    </div>
                )}
    </div>
  )
}
