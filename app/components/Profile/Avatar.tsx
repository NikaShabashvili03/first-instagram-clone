import { SafeUser } from '@/app/types/SafeUser'
import React from 'react'

interface AvatarProps {
    user: SafeUser
    small?: boolean
    medium?: boolean,
    big?: boolean
}

export default function Avatar({user, small, medium, big}: AvatarProps) {
  if(user.avatar){
    return (
        <span className={`text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium ${medium && 'w-[40px] h-[40px]'} ${small && 'h-8 w-7'} ${big && 'w-44 h-44'} flex justify-center items-center rounded-full text-sm px-4 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800`}>
            <img src={user.avatar} alt='avatar' className='w-full h-full'></img>
        </span>
    )
  }


  return (
      <span className={`text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium ${medium && 'w-[40px] h-[40px]'} ${small && 'h-8 w-7'} ${big && 'w-44 h-44'} flex justify-center items-center rounded-full text-sm px-4 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800`}>{user.name.charAt(0)}{user.surname.charAt(0)}</span>
  )
}
