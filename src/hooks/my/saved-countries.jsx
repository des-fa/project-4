import useSWR from 'swr'
import axios from 'axios'

import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMySavedCountries() {
  const { isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? '/api/my/saved-countries' : null, fetcher)

  const createMySavedCountries = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/saved-countries',
      data: values
    }).then((resp) => {
      mutate(resp.data)
    }).catch(handleErrors)
  }

  return {
    mySavedCountries: data,
    isLoadingSavedCountries: !error && !data,
    isError: error,
    errorMessage: error?.response?.data,
    createMySavedCountries
  }
}