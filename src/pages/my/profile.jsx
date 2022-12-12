import { useEffect, useState } from 'react'
import { Dropdown, Image } from 'react-bootstrap'

import withAuth from '@/hoc/withAuth'
import useMyProfile from '@/hooks/profile'

import ProfileTabs from '@/components-layouts/ProfileTabs'
import FormsProfileChangeModal from '@/forms/profile/ProfileChange'

function MyProfile({ profile, show, onClick, onHide, setEditModalShow }) {
  return (
    <>
      {/* <div className="row">
        <div className="col-12 my-4">
          <h2>Profile</h2>
        </div>
      </div> */}

      <div className="d-flex flex-lg-row flex-column">
        <div className="d-flex flex-column text-center w-100 pe-5 me-5 mb-4">
          <div className="d-flex justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="outline-dark">
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

          <div className="mb-2">
            <Image
              src={profile?.avatar}
              alt="profile-picture"
              className="rounded-circle"
              width={150}
              height={150}
            />
          </div>

          <div className="d-flex flex-column">
            <h4 className="fw-semibold text-uppercase">{profile?.fullName}</h4>
            <h5>{profile?.about}</h5>
          </div>
        </div>

        <div className="col-lg-8 col-md-12 border border-dark rounded p-4">
          <ProfileTabs />
        </div>
      </div>
    </>

  )
}

function MyProfileCreateModal(props) {
  return (
    <FormsProfileChangeModal show={props.show} onHide={props.onHide} />
  )
}

export function ProfilePage() {
  const { myProfile, isLoading } = useMyProfile()
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

  if (isLoading) { content = (<div>Loading...</div>) }

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
      />
    )
  }

  return (
    <div id="pages-my-profile" className="container pt-5">
      {content}
    </div>
  )
}

export default withAuth(ProfilePage)
