import useSWR from 'swr'

import { fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyUser() {
  const { isReady } = useRouter()
  const { data, error } = useSWR(isReady ? '/api/my/user' : null, fetcher)

  return {
    myUser: data,
    isLoadingUser: !error && !data,
    isError: error,
    errorMessage: error?.response?.data
  }
}
