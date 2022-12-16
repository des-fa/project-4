import React, { useState } from 'react'
import axios from 'axios'
import { Image } from 'react-bootstrap'

import FormsUserSearch from '@/forms/UserSearch'
import withAuth from '@/hoc/withAuth'

export function UsersSearch() {
  const [data, setData] = useState(null)
  // console.log(data)

  const handleSubmit = async (values) => {
    await axios({
      method: 'GET',
      url: '/api/users',
      data: values
    }).then((resp) => setData(resp?.data?.users))
  }

  return (
    <div className="container px-3">
      <div className="d-flex flex-column mt-5">
        <h3 className="text-muted fw-light mt-4 mb-5 ms-4">Search for Users</h3>

        <div className="d-flex flex-row mb-5 w-100">
          <FormsUserSearch handleSubmit={handleSubmit} />
        </div>

        <div className="d-flex flex-row justify-content-start ms-4">
          {data?.map((user, i) => (
            <div key={i} className="d-flex flex-row align-items-center border rounded-4 px-3 py-2 gap-2 w-25">
              <div className="text-center">
                <Image
                  src={user?.profile?.avatar}
                  className="img-fluid rounded-circle"
                  alt="user-profile-pic"
                  width="80"
                />
              </div>
              <div className="w-100 py-2 ps-3">
                <a href={`/users/${user?.id}`} className="text-decoration-none link-dark">
                  <h6 className="fw-semibold text-uppercase">{user?.profile?.fullName}</h6>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}
export default withAuth(UsersSearch)
