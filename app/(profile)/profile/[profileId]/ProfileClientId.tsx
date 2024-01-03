'use client'
import Avatar from '@/app/components/Profile/Avatar'
import FollowButton from '@/app/components/Profile/Follow/FollowButton'
import Follower from '@/app/components/Profile/Follow/Follower'
import PostCard from '@/app/components/Profile/Posts/PostCard'
import useFollowersModal from '@/app/hooks/useFollowersModal'
import useFollowingsModal from '@/app/hooks/useFollowingsModal'
import { useOnMountUnsafe } from '@/app/hooks/useOnMountUnsafe'
import socket from '@/app/libs/socket'
import { SafeUser } from '@/app/types/SafeUser'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'


interface ProfileClientIdProps {
    user: SafeUser,
    currentUser: SafeUser | null
}
export default function ProfileClientId({user, currentUser}: ProfileClientIdProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialized = useRef(false);
  const followersModal = useFollowersModal();
  const followingsModal = useFollowingsModal();
  
  const [followers, setFollowers] = useState(user.followers);

  useOnMountUnsafe(() => {
    socket.on('receive-unFollow', (obj) => {
      if(obj.otherId == user.id){
        setFollowers(followers.filter((usr: any) => 
          usr.myId == obj.otherId &&
          usr.otherId == obj.myId &&
          usr.other == obj.other
        ))
      }
    })
  })
  useOnMountUnsafe(() => {
    socket.on('receive-Follow', (obj) => {
      if(obj.otherId == user.id){
        setFollowers((prev: any) => [...prev, {
          myId: obj.otherId,
          otherId: obj.myId,
          other: obj.other
        }])
      }
    })
  })

  return (
    <div>
      <div className='flex-col px-5 py-10'>
        <div className='flex px-10 h-full '>
          <div className='w-[200px] mr-5 h-[300px] flex justify-center items-start'>
            <Avatar big user={user}/>
          </div>
          <div className='w-full'>
            <div className='flex h-[40px] flex-col sm:flex-row w-full justify-start items-start sm:items-center'>
              <h2 className='font-medium mr-10'>{user.fullname}</h2>
              <div className='w-full sm:w-1/6 flex justify-between'>
                <FollowButton follower={followers.some((user: any) => user.otherId === currentUser?.id)} currentUser={currentUser} user={user}/>
                <button className='px-4 ml-5 py-2 rounded text-sm font-medium text-black shadow bg-gray-300'>Message</button>
              </div>
            </div>
            <div className='mt-10 sm:mt-5 flex flex-col sm:flex-row justify-start items-start sm:items-start'>
              <span className='flex'>
                <h2 className='font-bold mr-2'>{user.posts.length}</h2>
                <p className='font-medium'>posts</p>
              </span>
              <div className=' ml-0 sm:ml-10'>
              <Follower title='followers' follows={followers.length} onClick={() => {
                        followersModal.onOpen() 
                        followersModal.setData(followers);
                      }}/>
              </div>
              <div className=' ml-0 sm:ml-10'>
                <Follower title='folowings' follows={user.followings.length} onClick={() => {
                  followingsModal.onOpen() 
                  followingsModal.setData(user.followings)
                }}/>
              </div>
            </div>
            <div className='mt-5'>
              <h2>{user.email}</h2>
              <h2 className='mt-2'>bio</h2>
            </div>
          </div>
        </div>
        <div className='w-full h-full flex justify-center items-center mb-2'>
          <h2 className='font-medium text-xl'>Posts</h2>
        </div>
        <div className='grid border-t-2 grid-cols-3 gap-5'>
          {user.posts.map((post: any, i: any) => (
                <PostCard currentUser={currentUser} user={user} post={post} key={i}/>
            )
          )}
        </div>
      </div>
    </div>
  )
}
