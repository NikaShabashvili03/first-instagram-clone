import Avatar from '@/app/components/Profile/Avatar'
import { SafeUser } from '@/app/types/SafeUser'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

interface ReplyProps {
    reply: any,
    currentUser: SafeUser | null,
    setReply: any,
    replys: any,
}
export default function Reply({reply, currentUser, setReply, replys}:ReplyProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const DeleteReply = () => {
        setLoading(true)
        axios.post('/api/post/comment/reply/delete', {replyId: reply?.id}).then(() => {
          toast.success("Reply Deleted")
          router.refresh();
          setLoading(false)
          setReply(replys?.filter((itm: any) => itm.id != reply.id))
        }).catch(() => {
            toast.error('Something went wrong')
            setLoading(false)
        })
      }
  return (
    <div className='z-10 py-2 relative ml-[14px] border-l-[2px] border-black'>
                <div className='absolute h-[2px] top-6 w-[15px] bg-black'></div>
                <div className='flex justify-between items-center'>
                    <span className="flex ml-4 items-center">
                        <Avatar small user={reply?.user}/>
                        <h2 className="ml-1 text-[13px] font-bold">{reply?.user?.fullname}:</h2>
                    </span>
                    {reply?.userId == currentUser?.id && (
                        <button disabled={loading} className="mr-10 text-sm" onClick={() => {DeleteReply()}}>
                            Delete
                        </button>
                    )}
                </div>
                <span className='font-normal text-[13px] ml-14'>{reply?.content}</span>
    </div>
  )
}