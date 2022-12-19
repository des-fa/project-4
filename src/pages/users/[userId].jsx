import React, { useEffect } from 'react'
import Router from 'next/router'
import { getSession } from 'next-auth/react'

import { Image } from 'react-bootstrap'

import withAuth from '@/hoc/withAuth'
import UserProfileTabs from '@/components-layouts/tabs/UserProfileTabs'
import useUserProfile from '@/hooks/users/profile'
import useUserVisitedCountries from '@/hooks/users/visited-countries'
import useUserPlans from '@/hooks/users/plans'

function UserProfile({ profile }) {
  const { userVisitedCountries } = useUserVisitedCountries()
  const { userPlans } = useUserPlans()

  return (
    <div className="d-flex flex-lg-row flex-md-row flex-column justify-content-evenly gap-4">
      <div className="card col-lg-3 col-md-3">
        <Image
          className="card-profile-picture img-fluid"
          src={profile?.avatar}
          alt="profile-picture"
          style={{ maxHeight: '250px' }}
        />
        <div className="card-body my-2">
          <div className="d-flex flex-row justify-content-between mb-2">
            <h4 className="fw-semibold text-capitalize">{profile?.fullName}</h4>
          </div>

          <h6>{profile?.about}</h6>
        </div>
      </div>

      <div className="col-lg-8 col-md-8 border border-gray rounded p-4">
        <UserProfileTabs
          userVisitedCountries={userVisitedCountries}
          userPlans={userPlans}
        />
      </div>
    </div>

  )
}

export function UserPage() {
  const checkUser = async () => {
    const session = await getSession()
    const { pathname } = Router
    const currentUser = session?.user?.id
    console.log(session?.user?.id)
    console.log(pathname)

    if (pathname === `/users/${currentUser}`) {
      console.log('not right')
      Router.push('/my/profile')
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  const { userProfile, isLoadingUserProfile, isError, errorMessage } = useUserProfile()
  console.log(userProfile)

  let content

  if (isLoadingUserProfile) {
    content = (
      <div>
        <h3 className="text-muted fw-light m-4">Loading....</h3>
      </div>
    )
  }
  if (isError) {
    content = (
      <div>
        <h3 className="text-muted fw-light m-4">{errorMessage}.</h3>
      </div>
    )
  }

  if (userProfile) {
    content = (
      <div className="w-100">
        <div className="d-flex flex-row justify-content-end mb-3 me-4 py-2 gap-3">
          <button
            type="button"
            className="btn btn-sm btn-dark text-white px-3 py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            </svg>
          </button>

          <button
            type="button"
            className="btn btn-sm btn-dark text-white px-3 py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
              <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
            </svg>
          </button>
        </div>

        <UserProfile
          profile={userProfile}
        />
      </div>
    )
  }

  return (
    <div id="pages-my-profile" className="container mb-5">
      {content}
    </div>

  )
}
export default withAuth(UserPage)
