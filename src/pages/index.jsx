import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export function Home() {
  const { push } = useRouter()
  const [image, setImage] = useState(null)

  const checkUser = async () => {
    const session = await getSession()
    if (session) {
      push('/home')
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://api.unsplash.com/photos/random/?client_id=LixDkr2eMJbLbPbLKIW6qcLtGuiI5Uul0VA0j_VE8BU&collections=11649432,landscape&orientation=landscape&count=1'
        )
        const result = res.data[0]
        setImage(result?.urls?.regular)
      } catch (error) {
        console.log(error)
      }
    }

    if (!image) { fetchData() }
    const interval = setInterval(() => {
      fetchData()
    }, 36000000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div
        className="d-flex flex-row justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minWidth: '100vh',
          minHeight: '100vh'
        }}
      >

        <div
          className="col-lg-6 rounded p-5"
          style={{
            background: 'rgba(255, 255, 255, 0.4)'
          }}
        >
          <div className="px-3">
            <h1 className="display-5 fw-bold lh-1 mb-3">The world,<br />at your fingertips.</h1>

            <p className="lead fw-semibold my-4">Discover the world from the comfort of your own home.<br />Get all the information you need to plan your next travels with a click of a mouse.</p>

            <div className="justify-content-md-start">
              <button
                type="button"
                className="btn btn-dark px-4 me-md-2"
                onClick={() => {
                  push('/signin')
                }}
              >Go</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Home
