import React from 'react'
import Auth from './components/Auth'
import getCurrentUser from '../../actions/getCurrentUser'
import { redirect } from 'next/navigation';
import SocketContext from '../../context/SocketContext';

export default async function page() {
  const currentUser = await getCurrentUser();
  
  if(currentUser){
    return redirect('/profile')
  }
  
  return (
    <>
      <Auth/>
    </>
  )
}
