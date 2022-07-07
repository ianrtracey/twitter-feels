import { Client } from 'twitter-api-sdk'
import fetch from 'node-fetch'
import { TwitterPaginatedResponse } from 'twitter-api-sdk/dist/types'

const BEARER_TOKEN =
  'AAAAAAAAAAAAAAAAAAAAAN9hdwEAAAAAT3kmTYqHKgggre1FKO7xSthqpMU%3DPQw8UO5w1mqt4bfJToTPtoI5TQeZ2DoJmPgLkBZVsJwYkrZYvA'
const client = new Client(BEARER_TOKEN)

async function getTweet () {
  const tweet = await client.tweets.findTweetById('20001')
  if (!tweet.data) {
    console.log('empty :(')
  } else {
    console.log(tweet.data.text)
  }
}

type InferenceResponse = Array<any>
const inferTweetSentiment = async (
  tweets: Array<string>
): Promise<InferenceResponse[]> => {
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment',
      {
        headers: {
          Authorization: 'Bearer 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'
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: tweets
        })
      }
    )
    const result = await response.json()
    return result
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

const getRecentTweets = async (
  queryText: string,
  numPages: number
): Promise<TwitterPaginatedResponse<any>> => {
  const MAX_RESULTS_PER_PAGE = 100
  let tweets = []
  let nextToken = null
  for (var i = 0; i < numPages; i++) {
    try {
      const resp: any = await client.tweets.tweetsRecentSearch({
        query: queryText,
        sort_order: 'relevancy',
        max_results: MAX_RESULTS_PER_PAGE,
        next_token: nextToken
      })
      console.log({
        num_tweets: resp.data.length,
        next_token: resp.meta.next_token
      })
      nextToken = resp.meta.next_token
      tweets = [...tweets, ...resp.data]
    } catch (err) {
      console.log(err)
    }
  }
  return tweets
}

// getRecentTweets('joe biden', 3)

async function main () {
  const tweets = await getRecentTweets('putin', 3)
  const tweetTexts = tweets.map(tweet => tweet.text)
  const inferences = await inferTweetSentiment(tweetTexts)
  const resultsAgg = {
    LABEL_0: { label: 'negative', score: 0.0 },
    LABEL_1: { label: 'neutral', score: 0.0 },
    LABEL_2: { label: 'positive', score: 0.0 }
  }
  for (const tweetScore of inferences) {
    for (const labels of tweetScore) {
      resultsAgg[labels.label] = {
        ...resultsAgg[labels.label],
        score: resultsAgg[labels.label].score + labels.score
      }
    }
  }
  const result = Object.keys(resultsAgg).map(key => resultsAgg[key])
  console.log(`$number of tweets scored: ${inferences.length}`)
  console.log(result)
}

main()
