import React from 'react'

import withAuth from '@/hoc/withAuth'

export function UserPage() {
  return (
    <div>
      <h1>
        User
      </h1>
    </div>

  )
}
export default withAuth(UserPage)
