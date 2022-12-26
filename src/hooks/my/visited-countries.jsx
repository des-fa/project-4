import useSWR from 'swr'
import axios from 'axios'

import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyVisitedCountries() {
  const { isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? '/api/my/visited-countries' : null, fetcher)

  const createMyVisitedCountries = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/visited-countries',
      data: values
    }).then((resp) => {
      mutate(resp.data)
    }).catch(handleErrors)
  }

  const updateMyVisitedCountries = async (values) => {
    console.log('hook', values)
    await axios({
      method: 'PUT',
      url: `/api/my/visited-countries/${values.id}`,
      data: values
    }).then((resp) => {
      mutate(resp.data)
    }).catch(handleErrors)
  }

  const destroyMyVisitedCountries = async (id) => {
    // console.log('hook', id)
    await axios({
      method: 'DELETE',
      url: `/api/my/visited-countries/${id}`
    }).then((resp) => {
      mutate(resp.data)
    }).catch((err) => {
      handleErrors(err)
    })
  }

  return {
    myVisitedCountries: data,
    isLoadingVisitedCountries: !error && !data,
    isError: error,
    errorMessage: error?.response?.data,
    createMyVisitedCountries,
    updateMyVisitedCountries,
    destroyMyVisitedCountries
  }
}
