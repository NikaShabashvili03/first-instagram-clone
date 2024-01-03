"use client"
import socket from '@/app/libs/socket'
import { SafeUser } from '@/app/types/SafeUser'
import React, { useEffect, useState } from 'react'


interface FollowButton {
  user: SafeUser,
  currentUser: SafeUser | null,
  follower: boolean
}

export default function FollowButton({user, currentUser, follower}: FollowButton) {
  if(!currentUser){
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);

  const unFollow = () => {
    setLoading(true)
    socket.emit('unFollow', {
      otherId: user.id,
      myId: currentUser.id,
      other: user
    })
    setLoading(false)
  }

  if(follower){
    return (
      <button className='px-4 py-2 rounded text-sm font-medium text-black shadow bg-gray-300' disabled={loading} onClick={() => {unFollow()}}>
        Unfollow
      </button>
    )
  }

  const Follow = () => {
    setLoading(true)
    socket.emit('Follow', {
      otherId: user.id,
      myId: currentUser.id,
      other: user
    })
    setLoading(false)
  }

  return (
    <button className='px-4 py-2 rounded text-sm font-medium text-black shadow bg-gray-300' disabled={loading} onClick={() => {Follow()}}>
      Follow
    </button>
  )
}
