import useSwr from 'swr'
import { NextPage } from 'next'
import Head from 'next/head'
import Search from '../components/Search'
import { useState } from 'react'

const fetcher = url => fetch(url).then(res => res.json())

const Home: NextPage = () => {
  const { data, error } = useSwr('/api/sentiment', fetcher)
  const [loading, setLoading] = useState(false)
  const [sentimentData, setSentimentData] = useState<any>(null)
  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  const onEnterPress = async query => {
    // your logic here
    setLoading(true)
    console.log('searching for', query)
    const res = await fetch('/api/sentiment', {
      method: 'POST',
      body: JSON.stringify({
        query
      })
    })

    if (res.status === 201) {
      setLoading(false)
      const data = await res.json()
      console.log(data)
      setSentimentData(data)
    }
  }

  // const d = {
  //   result: [
  //     { label: 'negative', score: 57.23035255406285 },
  //     { label: 'neutral', score: 181.26171703543514 },
  //     { label: 'positive', score: 61.5079283444219 }
  //   ]
  // }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex justify-center'></main>
      <Search onEnterPress={query => onEnterPress(query)} />
      {loading && <div>Loading...</div>}
      {sentimentData && (
        <div className='md:w-[584px] mx-auto mt-7 w-[100%] px-4'>
          <h2 className='text-xl font-bold text-slate-800'>Results</h2>
          {sentimentData.result.map(({ label, score }) => {
            const scoreSum = sentimentData.result.reduce(
              (acc, cur) => acc + cur.score,
              0
            )

            const colors = {
              negative: 'red',
              neutral: 'slate',
              positive: 'green'
            }
            const color = colors[label]
            const percentage = Math.round((score / scoreSum) * 100)
            console.log(percentage)

            return (
              <div>
                <div className='flex'>
                  <div className='font-base w-[65px]'>{label}</div>
                  <div>({percentage}%)</div>
                </div>
                <div
                  style={{ width: `${percentage}%` }}
                  className={`h-[10px] bg-${color}-400`}
                />
              </div>
            )
          })}
        </div>
      )}
      <footer></footer>
    </div>
  )
}

export default Home
