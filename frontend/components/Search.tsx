import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Search: NextPage = ({ onEnterPress }) => {
  const router = useRouter()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const keyDownHandler = event => {
      console.log('User pressed: ', event.key)

      if (event.key === 'Enter') {
        event.preventDefault()

        // 👇️ your logic here
        onEnterPress(query)
      }
    }
    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [query])

  return (
    <div className='text-center my-32'>
      <h1 className='text-3xl font-extrabold text-blue-400'>Twitter Feels</h1>
      <p>Realtime sentiment analysis about topics on Twitter</p>
      <div className='md:w-[584px] mx-auto mt-7 flex w-[100%] items-center rounded-full border hover:shadow-md'>
        <div className='pl-5'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            stroke-width='2'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
        <input
          type='text'
          className='w-full bg-transparent rounded-full py-[14px] pl-4 outline-none'
          placeholder='elon musk'
          onChange={event => setQuery(event.target.value)}
        />
      </div>
    </div>
  )
}

export default Search
