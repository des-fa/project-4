import useSWR from 'swr'
import { useRouter } from 'next/router'
import { serialize } from 'object-to-formdata'
import axios from 'axios'

import { handleErrors, fetcher } from '@/hooks/_utils'

export default function useMyVisitedCountries() {
  const { isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? '/api/my/visited-countries' : null, fetcher)

  const createMyVisitedCountries = async (values) => {
    console.log('hook', values)
    await axios({
      method: 'POST',
      url: '/api/my/visited-countries',
      // data: values
      data: serialize(values, { indices: true })
    }).then((resp) => {
      mutate(resp.data)
    }).catch(handleErrors)
  }

  const updateMyVisitedCountries = async (values) => {
    console.log('hook', values)
    await axios({
      method: 'PUT',
      url: `/api/my/visited-countries/${values.id}`,
      // data: values
      data: serialize(values, { indices: true })
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
