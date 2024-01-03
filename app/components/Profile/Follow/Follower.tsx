import React from 'react'

interface FollowerProps {
    onClick: () => void,
    follows: any,
    title: string
}
export default function Follower({
    onClick,
    follows,
    title
}: FollowerProps) {
  return (
    <div>
      <button className='flex' onClick={onClick}>
        <h2 className='font-bold mr-2'>{follows}</h2>
        <p className='font-medium'>{title}</p>
      </button>
    </div>
  )
}
