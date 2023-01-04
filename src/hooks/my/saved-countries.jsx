import useSWR from 'swr'
import axios from 'axios'

import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMySavedCountries() {
  const { query: { page }, isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? ['/api/my/saved-countries', { page: Number(page) || 1 }] : null, fetcher)

  const createMySavedCountries = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/saved-countries',
      data: values
    }).then((resp) => {
      mutate(resp.data)
    }).catch(handleErrors)
  }

  const destroyMySavedCountries = async (id) => {
    // console.log('hook', id)
    await axios({
      method: 'DELETE',
      url: `/api/my/saved-countries/${id}`
    }).then((resp) => {
      mutate(resp.data)
    }).catch((err) => {
      handleErrors(err)
    })
  }

  return {
    mySavedCountries: data,
    isLoadingSavedCountries: !error && !data,
    isError: error,
    errorMessage: error?.response?.data,
    createMySavedCountries,
    destroyMySavedCountries
  }
}
