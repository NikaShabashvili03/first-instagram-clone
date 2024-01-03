'use client'
import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';


enum Option {
  register,
  login
}
export default function Auth() {
  const [status, setStatus] = useState(Option.login);
  return (
      <section className="w-full flex justify-between h-screen items-center dark:bg-gray-900">
          <div className="flex flex-col w-full items-center justify-center px-6 py-8 mx-auto lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      {status == Option.login
                        ? <Login/>
                        : <Register Option={Option} setStatus={setStatus}/>
                      }
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              <button onClick={() => {setStatus(status == Option.login ? Option.register : Option.login)}}>{status == Option.login ? 'Create a new account' : 'Sign in to your account'}</button>
                      </p>
                  </div>
              </div>
          </div>
        </section>
      
  )
}
