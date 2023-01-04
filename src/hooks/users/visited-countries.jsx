import useSWR from 'swr'
import { useRouter } from 'next/router'

import { fetcher } from '@/hooks/_utils'

export default function useUserVisitedCountries() {
  const { query: { userId, page } } = useRouter()
  const { data, error } = useSWR(userId ? [`/api/users/${userId}/visited-countries`, { page: Number(page) || 1 }] : null, fetcher)

  return {
    userVisitedCountries: data,
    isLoadingVisitedCountries: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
