import useSWR from 'swr'
import { useRouter } from 'next/router'

import { fetcher } from '@/hooks/_utils'

export default function useCountryReviews() {
  const { query: { countryId } } = useRouter()
  const { data, error } = useSWR(countryId ? `/api/countries/${countryId}/reviews` : null, fetcher)

  return {
    countryReviews: data,
    isLoadingReviews: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
