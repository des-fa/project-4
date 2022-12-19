import useSWR, { mutate } from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
import produce from 'immer'

import { handleErrors, fetcher } from '@/hooks/_utils'

export default function useMyFollowing() {
  const { isReady, query: { followingId } } = useRouter()
  const { data, error } = useSWR(isReady ? '/api/my/following' : null, fetcher)

  const createFollowing = async (values) => {
    // console.log('val', values)
    await axios({
      method: 'POST',
      url: `/api/my/following/${followingId}`,
      data: values
    }).then((resp) => {
      mutate(produce(data, (draft) => {
        draft.push(resp.data)
        // console.log('resp', resp.data)
      }))
    }).catch(handleErrors)
  }

  const destroyFollowing = async (values) => {
    // console.log('val', values)
    await axios({
      method: 'DELETE',
      url: `/api/my/following/${followingId}`,
      data: values
    }).then(() => {
      mutate('/api/my/following')
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
