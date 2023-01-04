import useSWR from 'swr'

import { fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyFollowers() {
  const { query: { page }, isReady } = useRouter()
  const { data, error } = useSWR(isReady ? ['/api/my/followers', { page: Number(page) || 1 }] : null, fetcher)

  return {
    myFollowers: data,
    isLoadingFollowers: !error && !data,
    isError: error,
    errorMessage: error?.response?.data
  }
}
