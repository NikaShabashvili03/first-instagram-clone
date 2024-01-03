import React from 'react';
import FollowersModal from '../(profile)/modals/FollowersModal';
import FollowingsModal from '../(profile)/modals/FollowingsModal';
import PostModal from '../(posts)/modals/PostModal';
import { SafeUser } from '../types/SafeUser';
import NewPostModal from '../(profile)/modals/NewPostModal';


interface ModalContextProps {
  currentUser: SafeUser | null
}
export default function ModalContext({currentUser}: ModalContextProps) {
  return (
    <>
      <FollowersModal/>
      <FollowingsModal/>
      <NewPostModal/>
      <PostModal currentUser={currentUser}/>
    </>
  )
}
