'use client'
import Avatar from '@/app/components/Profile/Avatar'
import FollowButton from '@/app/components/Profile/Follow/FollowButton'
import Follower from '@/app/components/Profile/Follow/Follower'
import PostCard from '@/app/components/Profile/Posts/PostCard'
import useFollowersModal from '@/app/hooks/useFollowersModal'
import useFollowingsModal from '@/app/hooks/useFollowingsModal'
import useNewPostModal from '@/app/hooks/useNewPostModal'
import socket from '@/app/libs/socket'
import { SafeUser } from '@/app/types/SafeUser'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'


interface ProfileClientProps {
    currentUser: SafeUser
}
export default function ProfileClient({currentUser}: ProfileClientProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialized = useRef(false);
  const followersModal = useFollowersModal();
  const followingsModal = useFollowingsModal();
  const newPostModal = useNewPostModal();
  const [followers, setFollowers] = useState(currentUser.followers);
  useEffect(() => {
    if(!initialized.current){
      initialized.current = true
      socket.on('receive-Follow', (obj) => {
        if(obj.otherId == currentUser.id){
          setFollowers((prev: any) => [...prev, {
            myId: obj.otherId,
            otherId: obj.myId,
            other: obj.other
          }])
        }
      })
    }
  }, [])

  useEffect(() => {
    if(!initialized.current){
      initialized.current = true
      socket.on('receive-unFollow', (obj) => {
        if(obj.otherId == currentUser.id){
          setFollowers(followers.filter((usr: any) => 
            usr.myId == obj.otherId &&
            usr.otherId == obj.myId &&
            usr.other == obj.other
          ))
        }
      })
    }
  }, [])

  return (
    <div>
      <div className='flex-col px-5 py-10'>
        <div className='flex px-10 h-full '>
          <div className='w-[200px] mr-5 h-[300px] flex justify-center items-start'>
            <Avatar big user={currentUser}/>
          </div>
          <div className='w-full'>
            <div className='flex h-[40px] flex-col sm:flex-row w-full justify-start items-start sm:items-center'>
              <h2 className='font-medium mr-10'>{currentUser.fullname}</h2>
              <div className='w-full sm:w-1/6 flex justify-between'>
                <button onClick={() => {signOut()}} className='px-4 ml-5 py-2 rounded text-sm font-medium text-black shadow bg-gray-300'>Sign out</button>
              </div>
            </div>
            <div className='mt-10 sm:mt-5 flex flex-col sm:flex-row justify-start items-start sm:items-start'>
              <span className='flex'>
                <h2 className='font-bold mr-2'>{currentUser.posts.length}</h2>
                <p className='font-medium'>posts</p>
              </span>
              <div className=' ml-0 sm:ml-10'>
              <Follower title='followers' follows={followers.length} onClick={() => {
                        followersModal.onOpen() 
                        followersModal.setData(followers);
                      }}/>
              </div>
              <div className=' ml-0 sm:ml-10'>
                <Follower title='folowings' follows={currentUser.followings.length} onClick={() => {
                  followingsModal.onOpen() 
                  followingsModal.setData(currentUser.followings)
                }}/>
              </div>
            </div>
            <div className='mt-5'>
              <h2>{currentUser.email}</h2>
              <h2 className='mt-2'>bio</h2>
            </div>
          </div>
        </div>
        <div className='w-full h-full flex justify-center items-center mb-2'>
          <h2 className='font-medium text-xl'>Posts</h2>
        </div>
        <div className='flex  border-t-2  flex-col'>
          <div className='w-full flex justify-center items-center my-2'>
            <button onClick={() => {
              newPostModal.onOpen();
            }}>Add new post</button>
          </div>
          <div className='grid grid-cols-3 gap-5'>
            {currentUser.posts.map((post: any, i: any) => (
                  <PostCard currentUser={currentUser} user={currentUser} post={post} key={i}/>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
