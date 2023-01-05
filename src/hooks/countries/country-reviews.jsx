import useSWR from 'swr'
import { useRouter } from 'next/router'

import { fetcher } from '@/hooks/_utils'

export default function useCountryReviews() {
  const { query: { countryId, page } } = useRouter()
  const { data, error, mutate } = useSWR(countryId ? [`/api/countries/${countryId}/reviews`, { page: Number(page) || 1 }] : null, fetcher)

  return {
    countryReviews: data,
    isLoadingReviews: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    mutate
  }
}
