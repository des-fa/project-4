import useSWR from 'swr'

import { fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyFollowers() {
  const { isReady } = useRouter()
  const { data, error } = useSWR(isReady ? '/api/my/followers' : null, fetcher)

  return {
    myFollowers: data,
    isLoadingFollowers: !error && !data,
    isError: error,
    errorMessage: error?.response?.data
  }
}
