'use client'
import React, { useState } from 'react'
import Search from './Search'
import { SafeUser } from '@/app/types/SafeUser'
import { useRouter } from 'next/navigation';
import Link from 'next/link';


interface SearchModalProps {
  title: string,
  allUsers: Array<SafeUser> | null,
  close: () => void
}

export default function SearchModal({title, allUsers, close}: SearchModalProps) {
  const [filteredData, setFilteredData] = useState<any>([]);
  const handleFilter = (e: any) => {
    const searchWorld = e.target.value;
    const newFilter = allUsers?.filter((value: any) => {
        return value.fullname.toLowerCase().includes(searchWorld.toLowerCase()) || value.email.toLowerCase().includes(searchWorld.toLowerCase())
    })

    setFilteredData(newFilter);

    if(searchWorld === ""){
        setFilteredData([])
    }
  }
  return (
    <div className='mb-[100px] z-40 sm:ml-[100px] flex flex-col py-5 fixed border-r-2 border-gray-300 bg-white w-full sm:w-[60%] h-screen'>
      <div>
        <h2 className='text-2xl font-bold px-10 mb-10'>{title}</h2>
      </div>
      <div className='px-10'>
        <Search handleFilter={(e: any) => {handleFilter(e)}}/>
      </div>
      <div className={`w-full bg-transparent flex items-center h-full`}>
      <div className='w-full bg-white h-full overflow-hidden overflow-y-auto rounded-b-lg pt-8 px-10'>
                    <div className="flow-root">
                            <ul role="list" className="divide-gray-200">
                                {filteredData?.map((user: SafeUser, i: any) => (
                                  <Link onClick={close} href={`/profile/${user.id}`} key={i}>
                                    <li className="py-3 border-b w-full cursor-pointer hover:bg-gray-100">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                <span className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium w-[40px] h-[40px] flex justify-center items-center rounded-full text-sm py-2 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">{user.name.charAt(0)}{user.surname.charAt(0)}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        {user.fullname}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                  </Link>
                                ))}
                            </ul>
                    </div>
                </div>
            </div>
    </div>
  )
}