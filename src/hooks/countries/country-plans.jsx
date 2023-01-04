import useSWR from 'swr'
import { useRouter } from 'next/router'

import { fetcher } from '@/hooks/_utils'

export default function useCountryPlans() {
  const { query: { countryId, page } } = useRouter()
  const { data, error } = useSWR(countryId ? [`/api/countries/${countryId}/plans`, { page: Number(page) || 1 }] : null, fetcher)

  return {
    publicPlans: data,
    isLoadingPlans: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
