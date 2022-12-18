import { useEffect, useState } from 'react'
import axios from 'axios'

import { Dropdown, Image } from 'react-bootstrap'

import withAuth from '@/hoc/withAuth'
import useMyProfile from '@/hooks/my/profile'
import useMyVisitedCountries from '@/hooks/my/visited-countries'
import useMySavedCountries from '@/hooks/my/saved-countries'
import useMyPlans from '@/hooks/my/plans'
import useMyFollowing from '@/hooks/my/following'
import useMyFollowers from '@/hooks/my/followers'

import ProfileTabs from '@/components-layouts/tabs/ProfileTabs'
import FormsProfileChangeModal from '@/forms/profile/ProfileChange'

function MyProfile({ profile, show, onClick, onHide, setEditModalShow, countryInfo }) {
  const { myVisitedCountries } = useMyVisitedCountries()
  const { mySavedCountries } = useMySavedCountries()
  const { myPlans } = useMyPlans()
  const { myFollowing } = useMyFollowing()
  const { myFollowers } = useMyFollowers()

  return (
    <div className="d-flex flex-lg-row flex-md-row flex-column justify-content-between gap-5">
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

            <Dropdown>
              <Dropdown.Toggle
                variant="outline-dark"
                size="sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
              </Dropdown.Toggle>
              <Dropdown.Menu variant="dark">
                <Dropdown.Item onClick={onClick}>
                  Edit
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <FormsProfileChangeModal initialValues={profile} show={show} onHide={onHide} setEditModalShow={setEditModalShow} />
          </div>

          <h6>{profile?.about}</h6>
        </div>
      </div>

      <div className="col-lg-9 col-md-9 border border-gray rounded p-4">
        <ProfileTabs
          countryInfo={countryInfo}
          myVisitedCountries={myVisitedCountries}
          mySavedCountries={mySavedCountries}
          myPlans={myPlans}
          myFollowing={myFollowing}
          myFollowers={myFollowers}
        />
      </div>
    </div>

  )
}

function MyProfileCreateModal(props) {
  return (
    <FormsProfileChangeModal show={props.show} onHide={props.onHide} />
  )
}

export function ProfilePage({ countryInfo }) {
  const { myProfile, isLoadingProfile } = useMyProfile()
  // console.log(myProfile)
  const [createModalShow, setCreateModalShow] = useState(false)
  const [editModalShow, setEditModalShow] = useState(false)

  useEffect(() => {
    if (!myProfile && !createModalShow) {
      setTimeout(() => {
        setCreateModalShow(true)
      }, 2000)
    }
    if (myProfile && createModalShow) {
      setCreateModalShow(false)
    }
  }, [myProfile, createModalShow])

  let content

  if (isLoadingProfile) { content = (<div>Loading...</div>) }

  if (!myProfile) {
    content = (
      <MyProfileCreateModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />
    )
  }

  // if (isError) { content = (<div>{errorMessage}</div>) }

  if (myProfile) {
    content = (
      <MyProfile
        profile={myProfile}
        show={editModalShow}
        onClick={() => setEditModalShow(true)}
        onHide={() => setEditModalShow(false)}
        setEditModalShow={setEditModalShow}
        countryInfo={countryInfo}
      />
    )
  }

  return (
    <div id="pages-my-profile" className="container pt-5 mb-5">
      {content}
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const res = await axios.get('https://api.countrystatecity.in/v1/countries/', {
      headers: {
        'X-CSCAPI-KEY': 'VU1VSFd6Znc3MkZqTVF5aUxJTkJQeHBidlBsUDYybjlkS0haMm1pTQ=='
      }
    })
    return {
      props: {
        countryInfo: res.data
      }
    }
  } catch (e) {
    return {
      props: {
        countryInfo: null
      }
    }
  }
}

export default withAuth(ProfilePage)
