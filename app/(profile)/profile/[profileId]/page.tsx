import getUserById from '@/app/actions/getUserById';
import React from 'react'
import ProfileClient from '../ProfileClient';
import ProfileClientId from './ProfileClientId';
import { redirect } from 'next/navigation';
import getCurrentUser from '@/app/actions/getCurrentUser';


interface IParams {
    profileId: string;
}

export default async function page({ params }: { params: IParams}) {
  const userById = await getUserById({userId: params.profileId})
  const currentUser = await getCurrentUser();
  if(!userById){
    return redirect('/profile')
  }

  if(userById.id == currentUser?.id){
    return redirect('/profile')
  }

  return (
    <div>
      <ProfileClientId currentUser={currentUser} user={userById}/>
    </div>
  )
}
