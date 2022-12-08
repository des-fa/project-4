import useSWR from 'swr'
import axios from 'axios'

import { handleErrors, fetcher } from '@/hooks/_utils'
import { useRouter } from 'next/router'

export default function useMyProfile() {
  const { isReady } = useRouter()
  const { data, error, mutate } = useSWR(isReady ? '/api/my/profile' : null, fetcher)

  const createMyProfile = async (values) => {
    await axios({
      method: 'POST',
      url: '/api/my/profile',
      data: values
    }).then((resp) => {
      mutate(resp.data)
    }).catch(handleErrors)
  }

  const updateMyProfile = async (values) => {
    await axios({
      method: 'PUT',
      url: '/api/my/profile',
      data: values
    }).then((resp) => {
      mutate(resp.data)
    }).catch(handleErrors)
  }

  return {
    myProfile: data,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data,
    createMyProfile,
    updateMyProfile
  }
}
