'use client';


import { useEffect, useRef, useState } from "react";

import Modal from "./Modal";
import usePostModal from "@/app/hooks/usePostModal";
import { redirect, useRouter } from "next/navigation";
import Avatar from "@/app/components/Profile/Avatar";
import { SafeUser } from "@/app/types/SafeUser";
import { useForm } from "react-hook-form";
import socket from "@/app/libs/socket";
import { BiLike, BiSolidLike } from "react-icons/bi";
import Link from "next/link";
import Comments from "./Comments/Comments";
import { useOnMountUnsafe } from "@/app/hooks/useOnMountUnsafe";


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

interface PostModalProps {
  currentUser: SafeUser | null
}
const PostModal = ({currentUser}: PostModalProps) => {
  const {
    post,
    isOpen,
    onClose
  } = usePostModal();

  const initialized = useRef(false)

  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      content: '',
    }
  });
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const DeletePost = () => {
    setLoading(true)
    axios.post('/api/post/delete', {postId: post?.id}).then(() => {
      toast.success("Post Deleted")
      setLoading(false)
      onClose();
      router.refresh();
    }).catch(() => {
      toast.error('Something went wrong')
      setLoading(false)
    })
  }
  
  const [comments, setComments] = useState(post?.comments);
   const onSubmit = (data: any) => {
      setLoading(true);
      socket.emit('Comment', {
        content: data.content,
        postId: post.id,
        userId: currentUser?.id,
        user: currentUser
      });
      reset();
      setLoading(false);
    }


    useOnMountUnsafe(() => {
        socket.on('receive-Comment', (obj) => {
          if(obj.postId == post?.id){
            setComments((prev: any) => [...prev, {
              likes: [],
              content: obj.content,
              user: obj.user
            }])
          }
        })
    })
    

    useEffect(() => {
      setComments(post?.comments);
    }, [isOpen])


  let bodyContent = (
        <div className="flex flex-col mb-20 h-[65vh] sm:h-[55vh] sm:mb-0 sm:flex-row justify-between sm:justify-center">
            <div className="group w-full sm:w-[50%] relative h-[50%] sm:h-full">
                {/* <img src={post?.image} alt='' className='w-full h-full sm:h-full object-cover'></img> */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay
                    navigation={true}
                    modules={[ Navigation]}
                    className="mySwiper !w-full !h-full"
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
            </div>
            <div className="w-full sm:w-[50%] h-[60%] sm:h-full flex flex-col justify-between sm:items-center">
                <div className="w-full border-b h-[50px] sm:h-[100px] flex justify-between items-center">
                    <div className="ml-5 py-5 sm:py-0 flex justify-center items-center">
                        <Avatar small user={post?.user}/>
                        <h2 className="ml-2">{post?.user?.fullname}</h2>
                    </div>
                    {post?.userId == currentUser?.id && (
                      <button disabled={isLoading} className="mr-5" onClick={() => {DeletePost()}}>
                          Delete
                      </button>
                    )}
                </div>
                <div className={`${currentUser ? 'min-h-[80%] sm:min-h-[400px] max-h-[80%] sm:max-h-[400px]' : 'min-h-[450px] max-h-[450px]'} overflow-y-auto w-full`}>
                    {comments?.map((comment: any, i: any) => (
                      <Comments comments={comments} setComments={setComments} onClose={onClose} currentUser={currentUser} post={post} key={i} comment={comment}/>
                    )).reverse()}
                </div>
                {currentUser && (
                  <form className="relative w-full sm:rounded-b-none rounded-b-2xl flex justify-between items-end">
                    <input type="text" className="w-full sm:rounded-b-none rounded-b-2xl focus:border-0 p-2 border-t-2 border-gray-300" placeholder="Comment..." {...register("content", {required: true})} />
                    <button disabled={isLoading} onClick={handleSubmit(onSubmit)} className="w-[100px] rounded-b-2xl sm:rounded-b-none focus:border-0 p-2 border-t-2 border-gray-300" type="submit">Post</button>
                  </form>
                )}
            </div>
        </div>
  )

  return (
    <Modal
      isOpen={isOpen}
      title={`${post?.title}`}
      onClose={onClose}
      body={bodyContent}
    />
  );
}

export default PostModal;
