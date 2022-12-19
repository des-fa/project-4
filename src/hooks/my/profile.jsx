import useSWR from 'swr'
import { useRouter } from 'next/router'
import { serialize } from 'object-to-formdata'
import axios from 'axios'

import { handleErrors, fetcher } from '@/hooks/_utils'

export default function useMyProfile() {
  const { isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? '/api/my/profile' : null, fetcher)

  const createMyProfile = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/profile',
      data: serialize(values, { indices: true })
    }).then((resp) => {
      mutate(resp.data)
    }).catch(handleErrors)
  }

  const updateMyProfile = async (values) => {
    // console.log('hook', values)
    await axios({
      method: 'PUT',
      url: '/api/my/profile',
      data: serialize(values, { indices: true })
    }).then((resp) => {
      mutate(resp.data)
    }).catch(handleErrors)
  }

  return {
    myProfile: data,
    isLoadingProfile: !error && !data,
    isError: error,
    errorMessage: error?.response?.data,
    createMyProfile,
    updateMyProfile
  }
}
