import useSWR from 'swr'

import { fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyFollowing() {
  const { isReady } = useRouter()
  const { data, error } = useSWR(isReady ? '/api/my/following' : null, fetcher)

  return {
    myFollowing: data,
    isLoadingFollowing: !error && !data,
    isError: error,
    errorMessage: error?.response?.data
  }
}
