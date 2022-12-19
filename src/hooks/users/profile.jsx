import useSWR from 'swr'
import { useRouter } from 'next/router'

import { fetcher } from '@/hooks/_utils'

export default function useUserProfile() {
  const { query: { userId } } = useRouter()
  const { data, error } = useSWR(userId ? `/api/users/${userId}/profile` : null, fetcher)

  return {
    userProfile: data,
    isLoadingUserProfile: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
