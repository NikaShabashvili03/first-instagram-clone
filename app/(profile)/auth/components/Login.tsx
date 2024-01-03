'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Login() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
        defaultValues: {
          email: '',
          password: ''
        },
  });
  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setLoading(true)
    signIn('credentials', { 
      ...data, 
      redirect: false,
    })
    .then((callback) => {
      if (callback?.ok) {
        toast.success(":)", {
          style: {
            border: '1px solid blue',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        })
        router.refresh();
        setLoading(false)
      }
      
      if (callback?.error) {
        toast.error(":(", {
          style: {
            border: '1px solid #000D71',
            color: '#000D71',
          },
          iconTheme: {
            primary: '#000D71',
            secondary: '#FFFAEE',
          },
        })
        setLoading(false)
      }
    });
  }
  return (
    <div>
        <h1 className="text-xl font-bold leading-tight mb-8 tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
         </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" placeholder="Email" {...register("email", {required: true})} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" placeholder="Password" {...register("password", {required: true})} />
          </div>

          <input disabled={isLoading} className="w-full bg-blue-600 cursor-pointer hover:bg-blue-800 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit" />
        </form>
    </div>
  )
}
