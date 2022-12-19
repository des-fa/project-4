import useSWR from 'swr'
import { useRouter } from 'next/router'
import axios from 'axios'

import { handleErrors, fetcher } from '@/hooks/_utils'

export default function useMyFollowing() {
  const { isReady } = useRouter()

  const { data, error, mutate } = useSWR(isReady ? '/api/my/following' : null, fetcher)

  const createFollowing = async (id) => {
    // console.log('hook', id)
    await axios({
      method: 'POST',
      url: `/api/my/following/${id}`
    }).then((resp) => {
      mutate(resp.data)
    }).catch(handleErrors)
  }

  const destroyFollowing = async (id) => {
    // console.log('hook', id)
    await axios({
      method: 'DELETE',
      url: `/api/my/following/${id}`
    }).then((resp) => {
      mutate(resp.data)
    }).catch((err) => {
      handleErrors(err)
    })
  }

  return {
    myFollowing: data,
    isLoadingFollowing: !error && !data,
    isError: error,
    errorMessage: error?.response?.data,
    createFollowing,
    destroyFollowing
  }
}
