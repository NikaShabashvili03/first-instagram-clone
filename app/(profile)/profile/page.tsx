
import { signOut } from 'next-auth/react'
import React from 'react'
import ProfileClient from './ProfileClient'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { redirect } from 'next/navigation';

export default async  function page() {
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return redirect('/');
  }
  return (
    <div>
        <ProfileClient currentUser={currentUser}/>
    </div>
  )
}
