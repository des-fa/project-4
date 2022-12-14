import useSWR from 'swr'
import { useRouter } from 'next/router'

import { fetcher } from '@/hooks/_utils'

export default function useCountry() {
  const { query: { countryId } } = useRouter()
  const { data, error } = useSWR(countryId ? `/api/countries/${countryId}/plans` : null, fetcher)

  return {
    publicPlans: data,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
