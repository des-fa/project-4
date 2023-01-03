import React from 'react'
// import { ref, onValue } from 'firebase/database'

// import { getSession } from 'next-auth/react'
import { database } from '@/services/firebaseconfig'

import useMyUser from '@/hooks/my/user'
import ChatRoom from '@/components-layouts/ChatRoom'
import withAuth from '@/hoc/withAuth'

export function MessagesPage() {
  const { myUser } = useMyUser()

  return (
    <div className="container">
      <h1>
        Messages
      </h1>

      <ChatRoom myUser={myUser} db={database} />
    </div>

  )
}

export default withAuth(MessagesPage)
