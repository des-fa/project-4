import useSWR from 'swr'
// import { useRouter } from 'next/router'

import { fetcher } from '@/hooks/_utils'

export default function useUsers() {
  // const { query: { countryId } } = useRouter()
  const { data, error } = useSWR('/api/users', fetcher)

  return {
    users: data,
    isLoadingUseress: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message
  }
}
