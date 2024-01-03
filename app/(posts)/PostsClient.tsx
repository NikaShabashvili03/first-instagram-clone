'use client'
import React from 'react'

import PostCard from '../components/Posts/PostCard'
import { SafeUser } from '../types/SafeUser'

interface PostsClientProps {
    posts: any,
    currentUser: SafeUser | null
}

export default function PostsClient({posts, currentUser}: PostsClientProps) {
  return (
    <div>
      {posts?.map((post: any, i: any) => (
            <PostCard currentUser={currentUser} user={post.user} post={post} key={i}/>
        )
      )}
    </div>
  )
}
