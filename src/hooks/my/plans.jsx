import useSWR from 'swr'
import { useRouter } from 'next/router'
import axios from 'axios'

import { handleErrors, fetcher } from '@/hooks/_utils'

export default function useMyPlans() {
  const { query: { page }, isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? ['/api/my/plans', { page: Number(page) || 1 }] : null, fetcher)

  const createMyPlans = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/plans',
      data: values
    }).then((resp) => {
      mutate(resp.data)
    }).catch(handleErrors)
  }

  const updateMyPlans = async (values) => {
    // console.log('hook', values)
    await axios({
      method: 'PUT',
      url: `/api/my/plans/${values.id}`,
      data: values
    }).then((resp) => {
      mutate(resp.data)
    }).catch(handleErrors)
  }

  const destroyMyPlans = async (id) => {
    // console.log('hook', id)
    await axios({
      method: 'DELETE',
      url: `/api/my/plans/${id}`
    }).then((resp) => {
      mutate(resp.data)
    }).catch((err) => {
      handleErrors(err)
    })
  }

  return {
    myPlans: data,
    isLoadingPlans: !error && !data,
    isError: error,
    errorMessage: error?.response?.data,
    createMyPlans,
    updateMyPlans,
    destroyMyPlans
  }
}
