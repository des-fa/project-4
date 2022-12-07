import React from 'react'
import { Heading } from '@chakra-ui/react'

import withAuth from '@/hoc/withAuth'

export function Home() {
  return (
    <div>
      <Heading>
        Home
      </Heading>
    </div>

  )
}
export default withAuth(Home)
