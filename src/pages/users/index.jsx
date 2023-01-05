// import { useRouter } from 'next/router'
import React, { useState } from 'react'
import axios from 'axios'
import { Image } from 'react-bootstrap'

import FormsUserSearch from '@/forms/UserSearch'
import withAuth from '@/hoc/withAuth'

export function UsersSearch() {
  // const { push, replace } = useRouter()

  const [data, setData] = useState([])
  // const [meta, setMeta] = useState({})
  const [showResultsMessage, setShowResultsMessage] = useState(false)
  // console.log(data)

  const handleSubmit = async (values) => {
    // console.log(values)
    await axios({
      method: 'GET',
      url: '/api/users',
      params: values
    }).then((resp) => {
      setData(resp?.data?.users)
      // setMeta(resp?.data?.meta)
      // console.log(meta)
    })
      .then(() => setShowResultsMessage(true))
  }

  return (
    <div className="container px-3">
      <div className="d-flex flex-column mt-5">
        <h3 className="text-white fw-light mt-4 mb-5 ms-4">Connect with other users</h3>

        <div className="d-flex flex-row mb-5 w-100">
          <FormsUserSearch setData={setData} handleSubmit={handleSubmit} />
        </div>

        <div className="d-flex flex-column justify-content-start rounded ms-4 w-50">
          {data.map((user, index) => (
            <div key={index} className="users-search-result w-100 mb-4">
              <a href={`/users/${user?.id}`} className="text-decoration-none link-dark w-100">
                <div className="d-flex flex-lg-row align-items-center border rounded px-3 py-2 gap-2 w-100">
                  <div className="text-center">
                    <Image
                      src={user?.profile?.avatar}
                      className="img-fluid rounded-circle"
                      alt="user-profile-pic"
                      width="80"
                    />
                  </div>
                  <div className="w-100 py-2 ps-3">
                    <h6 className="fw-semibold text-uppercase">{user?.profile?.fullName}</h6>
                  </div>
                </div>
              </a>
            </div>

          ))}
        </div>

        <div
          className="d-flex flex-row"
          style={{ visibility: showResultsMessage ? 'visible' : 'hidden' }}
        >
          {
            data?.length <= 0 ? (
              <h5 className="fw-light ms-4 text-white">No users were found. Please enter another name or country to try again!</h5>
            ) : (
              null
            )
          }
        </div>
      </div>
    </div>

  )
}
export default withAuth(UsersSearch)
