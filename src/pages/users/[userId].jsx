import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { getSession } from 'next-auth/react'

import { Image } from 'react-bootstrap'

import withAuth from '@/hoc/withAuth'
import UserProfileTabs from '@/components-layouts/tabs/UserProfileTabs'
import useUserProfile from '@/hooks/users/profile'
import useUserVisitedCountries from '@/hooks/users/visited-countries'
import useUserPlans from '@/hooks/users/plans'
import useMyFollowing from '@/hooks/my/following'

function UserProfile({ profile, currentUser, createFollowing, destroyFollowing }) {
  const { userVisitedCountries } = useUserVisitedCountries()
  const { userPlans } = useUserPlans()
  const profileId = profile?.userId
  // console.log(profile?.userId)
  // console.log(currentUser)

  const followIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
      <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
    </svg>
  )

  const followingIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-check-fill" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
      <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </svg>
  )

  const [followButton, setFollowButton] = useState('true')
  const [followText, setFollowText] = useState('Follow')
  const [followImg, setFollowImg] = useState(followIcon)
  const [showMessageButton, setShowMessageButton] = useState(false)
  const [showFollowsYouText, setShowFollowsYouText] = useState(false)

  const followsCurrentUser = profile?.user?.following?.filter((follower) => follower.followingId === currentUser)

  const followingUser = profile?.user?.followedBy?.filter((follower) => follower.followerId === currentUser)

  // console.log('follows me', followsCurrentUser)
  // console.log('follows profile', followingUser)

  // changing buttons and follow message dynamically
  useEffect(() => {
    if (followsCurrentUser?.length !== 0 && followingUser?.length !== 0) {
      setFollowButton(false)
      setFollowText('Following')
      setFollowImg(followingIcon)
      setShowMessageButton(true)
      setShowFollowsYouText(true)
    } else if (followingUser?.length !== 0 && followsCurrentUser?.length === 0) {
      setFollowButton(false)
      setFollowText('Following')
      setFollowImg(followingIcon)
      setShowMessageButton(true)
      setShowFollowsYouText(false)
    } else if (followingUser?.length === 0 && followsCurrentUser?.length > 0) {
      setFollowButton(true)
      setFollowText('Follow Back')
      setFollowImg(followIcon)
      setShowMessageButton(true)
      setShowFollowsYouText(true)
    } else {
      setFollowButton(true)
      setFollowText('Follow')
      setFollowImg(followIcon)
      setShowFollowsYouText(false)
      setShowMessageButton(false)
    }
  }, [profile?.user])

  // clicking on follow button updates followers/following
  const handleClick = followingUser?.length !== 0 ? (
    async () => {
      await destroyFollowing(profileId)
      // .then(() => {
      //   console.log('unfollowed')
      // })
    }
  ) : (
    async () => {
      await createFollowing(profileId)
      // .then(() => {
      //   console.log('followed')
      // })
    }
  )

  return (
    <>
      <div className="d-flex flex-row justify-content-end me-4 py-2 gap-3">
        <button
          type="button"
          className="d-flex flex-row gap-2 align-items-center btn btn-sm btn-dark text-white px-3"
          style={{ visibility: showMessageButton ? 'visible' : 'hidden' }}
        >
          Message
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
          </svg>
        </button>

        <button
          type="button"
          // className="btn btn-sm btn-dark text-white px-3"
          className={followButton ? 'd-flex flex-row gap-2 align-items-center btn btn-sm btn-dark text-white px-3' : 'd-flex flex-row gap-2 align-items-center btn btn-sm btn-outline-secondary px-3'}
          onClick={handleClick}

        >
          {/* <div className="me-2"> */}
          {followText}
          {/* </div> */}
          {followImg}
        </button>
      </div>

      <div className="d-flex flex-row justify-content-end me-4 mb-2">
        <small
          className="text-muted text-decoration-underline"
          style={{ visibility: showFollowsYouText ? 'visible' : 'hidden' }}
        >
          Follows you
        </small>
      </div>

      <div className="d-flex flex-lg-row flex-md-row flex-column justify-content-evenly gap-4">
        <div className="card col-lg-3 col-md-3">
          <Image
            className="card-profile-picture img-fluid rounded-top"
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
    </>
  )
}

export function UserPage() {
  const { userProfile, isLoadingUserProfile, isError, errorMessage } = useUserProfile()
  const { createFollowing, destroyFollowing } = useMyFollowing()

  const [currentUser, setCurrentUser] = useState('')

  const checkUser = async () => {
    const session = await getSession()
    const { pathname } = Router
    setCurrentUser(session?.user?.id)
    // console.log(currentUser)
    // console.log(pathname)

    if (pathname === `/users/${currentUser}`) {
      console.log('not right')
      Router.push('/my/profile')
    }
  }

  useEffect(() => {
    checkUser()
  }, [userProfile])

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
        <h3 className="text-muted fw-light m-4">{errorMessage}</h3>
      </div>
    )
  }

  if (userProfile) {
    content = (
      <UserProfile
        profile={userProfile}
        currentUser={currentUser}
        createFollowing={createFollowing}
        destroyFollowing={destroyFollowing}
      />
    )
  }

  return (
    <div id="pages-my-profile" className="container mb-5">
      {content}
    </div>

  )
}
export default withAuth(UserPage)
