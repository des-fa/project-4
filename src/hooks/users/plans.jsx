import useSWR from 'swr'
import { useRouter } from 'next/router'

import { fetcher } from '@/hooks/_utils'

export default function useUserPlans() {
  const { query: { userId } } = useRouter()
  const { data, error } = useSWR(userId ? `/api/users/${userId}/plans` : null, fetcher)

  return {
    userPlans: data,
    isLoadingPlans: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
