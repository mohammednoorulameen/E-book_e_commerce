import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>

    <div className='flex  bg-slate min-h-full flex-1 flex-col justify-center px-6 py-12 pt-20 lg:px-8'>
      <hr class="w-1/2 mx-auto h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 md:text-4.5xl text-4xl font-primary tracking-tighter leading-5 font-semibold text-center text-customColorTertiaryDark'>
          Login Your Account
        </h2>
      </div>

      <div className=' mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
       
        <form className='mt-6 space-y-6 pt-2'>
        <div>

         
          <div>
            <label className='block text-sm font-medium text-gray-900'>
              Email address
            </label>
            <div className='mt-1'>
              <input
                id='email'
                name='email'
                type='text'
                autoComplete='email'
                className='w-full p-2  border border-black focus:outline-none focus:ring-1 focus:ring-black'
              />
            </div>
            <div className='pt-2 font-tertiary'>
            </div>
        </div>   
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium  text-gray-900'
              >
                Password
              </label>
            </div>
            
            <div className='mt-2'>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                className='w-full p-2  border border-black focus:outline-none focus:ring-1 focus:ring-black'
              />
            </div>

            <div className='grid grid-cols-2 '>
              <div>
              <p className='  text-start text-sm text-gray-500'>
          <a
            href='#'
            className='font-semibold  text-black hover:underline'
          >
            Forgotpassword?
          </a>
        </p>
              </div>
              <div>

            <p className='  text-end text-sm text-gray-500'>
            create account?{' '}
          <Link
            to='/register'
            className='font-semibold  text-black hover:underline'
            >
            Signup
          </Link>
        </p>
              </div>
            </div>

           

          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className=' w-4/12 justify-center bg-white border border-black text-black px-3 py-1.5 text-sm font-semibold shadow-sm hover:bg-black hover:text-white'
            >
              Sign Up
            </button>
          </div>
          <div className='text-slate-950 mt-10 items-center grid-cols-3 grid'>
            <hr className='text-slate-950' />
            <p className='text-center'>OR</p>
            <hr className='text-slate-950' />
          </div>
          <div>
            <button
              className='bg-white border-2 py-2 w-full mb-24 flex hover:border-black duration-300'
              type='button'
            >
              <div className='mx-auto flex'>
                <p className=' font-tertiary  ms-5 font-semibold '>
                  Login With Google
                </p>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login