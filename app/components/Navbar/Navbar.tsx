'use client'
import React, { useState } from 'react'
import { SafeUser } from '../../types/SafeUser';
import Link from 'next/link';
import Search from '../Search/Search';
import Avatar from '../Profile/Avatar';
import { IoHomeOutline, IoHome, IoSearchOutline, IoSearchSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import SearchModal from '../Search/SearchModal';
import { FaRegUser, FaUser } from "react-icons/fa6";
import { signOut } from 'next-auth/react';
import { IoExitOutline } from "react-icons/io5";

interface HeaderProps {
    currentUser: SafeUser | null
    allUsers: Array<SafeUser> | null,
    children: any
}
export default function Navbar({currentUser, allUsers, children}: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  return (
    <>
        <div className='hidden sm:flex min-h-screen h-auto'>
            <div className='w-[100px] bg-gray-50 border-grey-300 py-5 flex flex-col justify-between items-center fixed h-full border-r'>
                <div>
                    <Link href="/" className="flex mb-[20px] items-center">
                        <img src="/images/logo.png" className="h-7" alt="Flowbite Logo" />
                    </Link>
                </div>
                <div className='flex flex-col h-2/6 justify-between items-center'>
                    <Link href={"/"}>
                        {pathname === '/' ? <IoHome className="h-7 w-7"/> : <IoHomeOutline className="h-7 w-7"/>}
                    </Link>
                    <button onClick={() => {
                        setShowSearch(!showSearch)
                    }}>
                        {showSearch ? (
                            <IoSearchSharp className="h-7 w-7"/>
                        ) : (
                            <IoSearchOutline className="h-7 w-7"/>
                        )}
                    </button>
                    {currentUser ? (
                        <Link href={'/profile'}>
                            {pathname === '/profile' ? (
                                <div className='p-2 flex justify-center items-center bg-transparent rounded-full border border-black w-9 h-9'>
                                    <Avatar small user={currentUser}/>
                                </div>
                            ) : (
                                <Avatar small user={currentUser}/>
                            )}
                        </Link>
                    ) : (
                        <Link href={'/auth'}>
                            {pathname === '/auth' ? <FaUser className="h-7 w-7"/> : <FaRegUser className="h-7 w-7"/>}
                        </Link>
                    )}
                </div>
                <div>
                    {currentUser && (
                         <Link href={"/"}>
                            <IoExitOutline onClick={() => {signOut()}} className="h-7 w-7"/>
                        </Link>
                    )}
                </div>
            </div>
            {showSearch && (
                <SearchModal  close={() => {setShowSearch(false)}} allUsers={allUsers} title="Search"/>
            )}
            <div className='w-full ml-[100px]'>
                {children}
            </div>
        </div>
        <div className='sm:hidden flex flex-col min-h-screen h-auto'>
            <div className='w-full bg-gray-50 h-[100px] border-grey-300 py-5 flex bottom-0 bg-white justify-between items-center z-50 fixed border-t'>
                <div>
                    <Link href="/" className="flex ml-[20px] items-center">
                        <img src="/images/logo.png" className="h-7" alt="Flowbite Logo" />
                    </Link>
                </div>
                <div className='flex w-2/6 justify-between items-center'>
                    <Link href={"/"}>
                        {pathname === '/' ? <IoHome className="h-7 w-7"/> : <IoHomeOutline className="h-7 w-7"/>}
                    </Link>
                    <button onClick={() => {
                        setShowSearch(!showSearch)
                    }}>
                        {showSearch ? (
                            <IoSearchSharp className="h-7 w-7"/>
                        ) : (
                            <IoSearchOutline className="h-7 w-7"/>
                        )}
                    </button>
                    {currentUser ? (
                        <Link href={'/profile'}>
                            {pathname === '/profile' ? (
                                <div className='p-2 flex justify-center items-center bg-transparent rounded-full border border-black w-9 h-9'>
                                    <Avatar small user={currentUser}/>
                                </div>
                            ) : (
                                <Avatar small user={currentUser}/>
                            )}
                        </Link>
                    ) : (
                        <Link href={'/auth'}>
                            {pathname === '/auth' ? <FaUser className="h-7 w-7"/> : <FaRegUser className="h-7 w-7"/>}
                        </Link>
                    )}
                </div>
                <div className='mr-[20px]'>
                    {currentUser && (
                         <Link href={"/"}>
                            <IoExitOutline onClick={() => {signOut()}} className="h-7 w-7"/>
                        </Link>
                    )}
                </div>
            </div>
            {showSearch && (
                <SearchModal  close={() => {setShowSearch(false)}} allUsers={allUsers} title="Search"/>
            )}
            <div className='w-full mb-[100px]'>
                {children}
            </div>
        </div>
    </>
    // <header className='relative'>
    //      <nav className="bg-white relative border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
    //         <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
    //             <a href="/" className="flex items-center">
    //                 <img src="/images/logo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
    //                 <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Instagram</span>
    //             </a>
    //             <div className="flex items-center lg:order-2">
    //                 {currentUser 
    //                 ? (
    //                     <Link href={`/profile`} className='group flex justify-center items-center transition-all'>
    //                         <Avatar small user={currentUser}/>
    //                     </Link>
    //                 ) : (
    //                     <>
    //                         <a href="/auth" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
    //                     </>
    //                 )}
    //                 <button onClick={() => {setShow(!show)}} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
    //                     <span className="sr-only">Open main menu</span>
    //                     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
    //                     <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    //                 </button>
    //             </div>
    //             <div className={`${show ? 'flex' : 'hidden'} relative justify-between mt-5 lg:mt-0 items-center w-full lg:flex lg:w-6/12 `}>
    //                 <Search searchUsers={allUsers}/>
    //             </div>
    //         </div>
    //     </nav> 
    // </header>
  )
}
