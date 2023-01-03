import React from 'react'
// import React, { useState, useEffect } from 'react'
// import { ref, onValue } from 'firebase/database'
// import { database } from '@/services/firebaseconfig'

export function Home() {
  // const [state, setState] = useState(null)

  // const readData = () => {
  //   const starCountRef = ref(database, 'users')
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val()
  //     setState(data)
  //   })
  // }

  // useEffect(() => {
  //   readData()
  // }, [])

  // console.log(state)

  return (
    <div className="container">
      <h1>
        Home
      </h1>
    </div>

  )
}

export default Home
