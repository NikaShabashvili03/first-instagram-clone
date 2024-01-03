'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


export default function Register({Option, setStatus}: any) {

  const [isLoading, setLoading] = useState(false);
  const { 
    register, 
    handleSubmit,
    control,
    watch,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
        defaultValues: {
          name: '',
          surname: '',
          email: '',
          password: '',
          confirm_password: ''
        },
  });
  
  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    setLoading(true)
    await axios.post('api/user/register', {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
    }).then(() => {
      toast.success("You successfully registered", {
        style: {
          border: '1px solid #000D71',
          color: '#000D71',
        },
        iconTheme: {
          primary: '#000D71',
          secondary: '#FFFAEE',
        },
      })
      setStatus(Option.login)
      setLoading(false)
    }).catch((error) => {
      toast.error("This email address already exists", {
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
    })

  }
  return (
    <div>
      <h1 className="text-xl font-bold leading-tight mb-8 tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create a new account
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
       <div>
          <div className='w-full mb-6 relative flex justify-center items-center'>
          </div>
          <div className='flex mb-2 gap-2'>
            <div className='w-full'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Name" {...register("name", {required: true})} />
            </div>
            <div className='w-full'>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Surname</label>
              <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Surname" {...register("surname", {required: true})} />
            </div>
          </div>
       </div>
       <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="email" placeholder="Email" {...register("email", {required: true})} />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" placeholder="Password" {...register("password", {required: true})} />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" placeholder="Password" 
          {...register("confirm_password", {
            required: true,
            validate: (val: string) => {
              if (watch('password') != val) {
                return "Your passwords do no match";
              }
            },
          })} />
        </div>
        

        <input disabled={isLoading} className="w-full bg-blue-600 cursor-pointer hover:bg-blue-800 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit" />
      </form>
    </div>
  )
}
