import useSWR from 'swr'

import withAuth from '@/hoc/withAuth'
import { fetcher } from '@/hooks/_utils'

export function Private() {
  const { data } = useSWR('/api/private', fetcher)
  console.log(data) // eslint-disable-line

  return (
    <div>this is a protected page!</div>
  )
}

export default withAuth(Private)
