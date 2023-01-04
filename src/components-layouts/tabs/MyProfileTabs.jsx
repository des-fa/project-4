import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Dropdown, Image } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'

import useMyVisitedCountries from '@/hooks/my/visited-countries'
import useMySavedCountries from '@/hooks/my/saved-countries'
import useMyPlans from '@/hooks/my/plans'
import useMyFollowing from '@/hooks/my/following'
import useMyFollowers from '@/hooks/my/followers'

import FormsProfileVisitedChangeModal from '@/forms/profile/VisitedChange'
import FormsProfilePlansChangeModal from '@/forms/profile/PlansChange'
import DeleteConfirmation from '../DeleteConfirmation'

function ProfileTabs({ countryInfo }) {
  // console.log(countryInfo)
  const { query, isReady, push, replace } = useRouter()

  const [createVisitedModalShow, setCreateVisitedModalShow] = useState(false)
  const [editVisitedModalShow, setEditVisitedModalShow] = useState(false)
  const [editVisitedModalValues, setEditVisitedModalValues] = useState(null)

  const [createPlansModalShow, setCreatePlansModalShow] = useState(false)
  const [editPlansModalShow, setEditPlansModalShow] = useState(false)
  const [editPlansModalValues, setEditPlansModalValues] = useState(null)

  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [deleteData, setDeleteData] = useState('')
  const [handleDeleteModal, setHandleDeleteModal] = useState('')

  const { myVisitedCountries, isLoadingVisitedCountries, destroyMyVisitedCountries } = useMyVisitedCountries()
  const { mySavedCountries, isLoadingSavedCountries, destroyMySavedCountries } = useMySavedCountries()
  const { myPlans, isLoadingPlans, destroyMyPlans } = useMyPlans()
  const { myFollowing, isLoadingFollowing } = useMyFollowing()
  const { myFollowers, isLoadingFollowers } = useMyFollowers()

  useEffect(() => {
    if (isReady && query?.page) {
      replace('/my/profile', undefined, { shallow: true })
    }
  }, [])

  const handleDelete = async (values) => {
    if (handleDeleteModal === 'visited') {
      await destroyMyVisitedCountries(values)
      // .then(() => {
      //   console.log(values)
      // })
    }
    if (handleDeleteModal === 'saved') {
      await destroyMySavedCountries(values)
      // .then(() => {
      //   console.log(values)
      // })
    }
    if (handleDeleteModal === 'plan') {
      await destroyMyPlans(values)
      // .then(() => {
      //   console.log(values)
      // })
    }
  }

  let visited
  if (isLoadingVisitedCountries) {
    visited = (
      <div>
        <h5 className="text-muted fw-light m-4">Loading....</h5>
      </div>
    )
  } if (myVisitedCountries?.visitedCountries?.length > 0) {
    visited = (
      myVisitedCountries?.visitedCountries?.map((country, i) => (
        <div
          key={i}
          className="border-bottom border-gray mb-3 px-3 py-2 mx-2"
        >
          <div className="d-flex flex-row  justify-content-between align-items-center">
            <div>
              <a
                className="text-decoration-none link-dark"
                href={`/countries/${country?.iso2}`}
              >
                <h4 className="action-title text-decoration-underline">{country?.countryName}</h4>
              </a>
            </div>

            <div>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  size="sm"
                  variant="outline-dark"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 15 15">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setEditVisitedModalShow(true)
                      setEditVisitedModalValues(country)
                    // console.log('country', country)
                    }}
                  >Edit</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    setDeleteData(country?.id)
                    setHandleDeleteModal('visited')
                    setDeleteModalShow(true)
                  }}
                  >Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <FormsProfileVisitedChangeModal
                initialValues={editVisitedModalValues}
                countryInfo={countryInfo}
                show={editVisitedModalShow}
                onHide={() => setEditVisitedModalShow(false)}
                setEditVisitedModalShow={setEditVisitedModalShow}
              />
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-3 mt-1 text-muted">
            <Image
              className="me-2"
              src="/images/star.png"
              alt="star-icon"
              width="20"
            />
            <p className="mb-0 fw-semibold">{country?.rating}.0</p>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <Image
              className="me-2"
              src="/images/calendar.png"
              alt="calendar-icon"
              width="20"
            />
            <p className="mb-0">{country?.month} / {country?.year}</p>
          </div>

          { country?.tips?.length > 0 ? (
            <h5 className="my-3 text-muted">Visited Cities</h5>
          ) : (
            null
          )}

          {
          country?.tips ? (
            country?.tips?.map((tip, index) => (
              <div key={index} className="my-2">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column me-2">
                    <Image
                      src="/images/pin.png"
                      alt="pin-icon"
                      height="20"
                    />
                  </div>

                  <div className="col">
                    <h6>{tip?.city}, {tip?.stateName}</h6>
                    <p>{tip?.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (null)
        }
        </div>
      ))
    )
  } if (myVisitedCountries?.visitedCountries?.length === 0) {
    visited = (<h3 className="text-muted fw-light m-4">You haven&apos;t added any information about your past travels yet.</h3>)
  }

  let saved
  if (isLoadingSavedCountries) {
    saved = (
      <div>
        <h5 className="text-muted fw-light m-4">Loading....</h5>
      </div>
    )
  } if (mySavedCountries?.savedCountries?.length > 0) {
    saved = (
      mySavedCountries?.savedCountries?.map((country, i) => (
        <div
          key={i}
          className="border-bottom border-gray mb-3 px-3 mx-2"
        >
          <div className="d-flex flex-row  justify-content-between align-items-center mb-3">
            <div>
              <a
                className="text-decoration-none link-dark"
                href={`/countries/${country?.iso2}`}
              >
                <h5 className="action-title mb-0">{country?.countryName}</h5>
              </a>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-sm"
                value={country?.iso2}
              // onClick={
              //   handleDeleteSavedCountry}
                onClick={(e) => {
                  setDeleteData(e.currentTarget.value)
                  setHandleDeleteModal('saved')
                  setDeleteModalShow(true)
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="action-btn bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))
    )
  } if (mySavedCountries?.savedCountries?.length === 0) {
    saved = (
      <>
        <h3 className="text-muted fw-light m-4">You don&apos;t any saved countries yet.</h3>

        <h5 className="fw-light m-4">
          <Link href="/countries" passHref><a className="action-title text-decoration-none link-dark fw-semibold">Search</a></Link> for countries to save!
        </h5>
      </>
    )
  }

  let plans
  if (isLoadingPlans) {
    plans = (
      <div>
        <h5 className="text-muted fw-light m-4">Loading....</h5>
      </div>
    )
  } if (myPlans?.plans?.length > 0) {
    plans = (
      myPlans?.plans?.map((plan, i) => (
        <div
          key={i}
          className="border-bottom border-gray mb-3 px-3 py-2 mx-2"
        >
          <div className="d-flex flex-row  justify-content-between align-items-center mb-2">
            <div>
              <a
                className="text-decoration-none link-dark"
                href={`/countries/${plan?.iso2}`}
              >
                <h4 className="action-title text-decoration-underline">{plan?.countryName}</h4>
              </a>
            </div>

            <div>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  size="sm"
                  variant="outline-dark"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 15 15">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setEditPlansModalShow(true)
                      setEditPlansModalValues(plan)
                    }}
                  >Edit</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    setDeleteData(plan?.id)
                    setHandleDeleteModal('plan')
                    setDeleteModalShow(true)
                  }}
                  >Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <FormsProfilePlansChangeModal
                initialValues={editPlansModalValues}
                countryInfo={countryInfo}
                show={editPlansModalShow}
                onHide={() => setEditPlansModalShow(false)}
                setEditPlansModalShow={setEditPlansModalShow}
              />
            </div>
          </div>

          <div className="d-flex flex-row align-items-center">
            <Image
              className="me-2"
              src="/images/calendar.png"
              alt="calendar-icon"
              width="20"
            />
            <p className="mb-0">{plan?.month} / {plan?.year}</p>
          </div>

          <div className="d-flex flex-row align-items-center justify-content-start my-3">
            <small className="border rounded border-dark px-2 py-1 mb-0 bg-secondary text-white">{
              plan?.isPublic ? ('PUBLIC') : ('PRIVATE')
              }
            </small>
          </div>
        </div>
      ))
    )
  } if (myPlans?.plans?.length === 0) {
    plans = (
      <h3 className="text-muted fw-light m-4">You haven&apos;t made any travel plans yet.</h3>
    )
  }

  let following
  if (isLoadingFollowing) {
    following = (
      <div>
        <h5 className="text-muted fw-light m-4">Loading....</h5>
      </div>
    )
  } if (myFollowing?.following?.length > 0) {
    following = (
      myFollowing?.following?.map((user, i) => (
        <div
          key={i}
          className="d-flex flex-row  justify-content-start align-items-center border-bottom border-gray px-3 py-2 mx-2 mb-3"
        >
          <div className="d-flex flex-column me-3">
            <Image
              className="img-fluid rounded-circle"
              src={user?.following?.profile?.avatar}
              alt="user-profile-pic"
              width="70"
            />
          </div>

          <div className="d-flex flex-column">
            <a
              className="text-decoration-none link-dark"
              href={`/users/${user?.following?.id}`}
            >
              <h5 className="action-title text-capitalize">{user?.following?.profile?.fullName}</h5>
            </a>
          </div>
        </div>
      ))
    )
  } if (myFollowing?.following?.length === 0) {
    following = (
      <>
        <h3 className="text-muted fw-light m-4">You aren&apos;t following anyone yet.</h3>

        <h5 className="fw-light m-4">
          <Link href="/users" passHref><a className="action-title text-decoration-none link-dark fw-semibold">Connect</a></Link> with other users!
        </h5>
      </>
    )
  }

  let followers
  if (isLoadingFollowers) {
    followers = (
      <div>
        <h5 className="text-muted fw-light m-4">Loading....</h5>
      </div>
    )
  } if (myFollowers?.followers?.length > 0) {
    followers = (
      myFollowers?.followers?.map((user, i) => (
        <div
          key={i}
          className="d-flex flex-row  justify-content-start align-items-center border-bottom border-gray px-3 py-2 mx-2 mb-3"
        >
          <div className="d-flex flex-column me-3">
            <Image
              className="img-fluid rounded-circle"
              src={user?.follower?.profile?.avatar}
              alt="user-profile-pic"
              width="70"
            />
          </div>

          <div className="d-flex flex-column">
            <a
              className="text-decoration-none link-dark"
              href={`/users/${user?.follower?.id}`}
            >
              <h5 className="action-title text-capitalize">{user?.follower?.profile?.fullName}</h5>
            </a>
          </div>
        </div>
      ))
    )
  } if (myFollowers?.followers?.length === 0) {
    followers = (
      <>
        <h3 className="text-muted fw-light m-4">You don&apos;t have any followers yet.</h3>

        <h5 className="fw-light m-4">
          <Link href="/users" passHref><a className="action-title text-decoration-none link-dark fw-semibold">Connect</a></Link> with other users!
        </h5>
      </>
    )
  }

  return (
    <Tab.Container
      defaultActiveKey="visited"
      onSelect={() => {
        replace('/my/profile', undefined, { shallow: true })
        // console.log(k)
      }}
    >
      <DeleteConfirmation
        data={deleteData}
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        confirm={handleDelete}
      />

      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="visited">Visited</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saved">Saved</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="plans">Travel Plans</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="following">Following</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="followers">Followers</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="visited">
              <div className="d-flex flex-row justify-content-end mb-4">
                <button
                  type="button"
                  className="btn btn-sm btn-dark"
                  onClick={() => setCreateVisitedModalShow(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                  </svg>
                </button>
              </div>
              <div className="my-2 px-3">
                {visited}

                <div className="d-flex flex-row justify-content-center mt-4">
                  {
                    myVisitedCountries?.meta?.currentPage >= 1 && myVisitedCountries?.meta?.currentPage < myVisitedCountries?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => push(`/my/profile/?page=${myVisitedCountries.meta.currentPage + 1}`)}
                    >Next</button>
                    )
                  }
                  {
                    myVisitedCountries?.meta?.currentPage !== 1 && myVisitedCountries?.meta?.currentPage <= myVisitedCountries?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => push(`/my/profile/?page=${myVisitedCountries.meta.currentPage - 1}`)}
                    >Previous</button>
                    )
                  }
                </div>
              </div>

              <FormsProfileVisitedChangeModal countryInfo={countryInfo} show={createVisitedModalShow} onHide={() => setCreateVisitedModalShow(false)} />
            </Tab.Pane>

            <Tab.Pane eventKey="saved">
              <div className="d-flex flex-row justify-content-end mb-4">
                <Link href="/countries" passHref>
                  <button type="button" className="btn btn-sm btn-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                </Link>
              </div>
              <div className="my-2 px-3">
                {saved}

                <div className="d-flex flex-row justify-content-center mt-4">
                  {
                    mySavedCountries?.meta?.currentPage >= 1 && mySavedCountries?.meta?.currentPage < mySavedCountries?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => push(`/my/profile/?page=${mySavedCountries.meta.currentPage + 1}`)}
                    >Next</button>
                    )
                  }
                  {
                    mySavedCountries?.meta?.currentPage !== 1 && mySavedCountries?.meta?.currentPage <= mySavedCountries?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => push(`/my/profile/?page=${mySavedCountries.meta.currentPage - 1}`)}
                    >Previous</button>
                    )
                  }
                </div>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="plans">
              <div className="d-flex flex-row justify-content-end mb-4">
                <button
                  type="button"
                  className="btn btn-sm btn-dark"
                  onClick={() => setCreatePlansModalShow(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                  </svg>
                </button>
              </div>
              <div className="my-2 px-3">
                {plans}

                <div className="d-flex flex-row justify-content-center mt-4">
                  {
                    myPlans?.meta?.currentPage >= 1 && myPlans?.meta?.currentPage < myPlans?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => push(`/my/profile/?page=${myPlans.meta.currentPage + 1}`)}
                    >Next</button>
                    )
                  }
                  {
                    myPlans?.meta?.currentPage !== 1 && myPlans?.meta?.currentPage <= myPlans?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => push(`/my/profile/?page=${myPlans.meta.currentPage - 1}`)}
                    >Previous</button>
                    )
                  }
                </div>
              </div>

              <FormsProfilePlansChangeModal countryInfo={countryInfo} show={createPlansModalShow} onHide={() => setCreatePlansModalShow(false)} />
            </Tab.Pane>

            <Tab.Pane eventKey="following">
              <div className="d-flex flex-row justify-content-end mb-4">
                <Link href="/users" passHref>
                  <button type="button" className="btn btn-sm btn-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                </Link>
              </div>
              <div className="my-2 px-3">
                {following}

                <div className="d-flex flex-row justify-content-center mt-4">
                  {
                    myFollowing?.meta?.currentPage >= 1 && myFollowing?.meta?.currentPage < myFollowing?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => push(`/my/profile/?page=${myFollowing.meta.currentPage + 1}`)}
                    >Next</button>
                    )
                  }
                  {
                    myFollowing?.meta?.currentPage !== 1 && myFollowing?.meta?.currentPage <= myFollowing?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => push(`/my/profile/?page=${myFollowing.meta.currentPage - 1}`)}
                    >Previous</button>
                    )
                  }
                </div>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="followers">
              <div className="d-flex flex-row justify-content-end mb-4">
                <Link href="/users" passHref>
                  <button type="button" className="btn btn-sm btn-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                </Link>
              </div>
              <div className="my-2 px-3">
                {followers}

                <div className="d-flex flex-row justify-content-center mt-4">
                  {
                    myFollowers?.meta?.currentPage >= 1 && myFollowers?.meta?.currentPage < myFollowers?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => push(`/my/profile/?page=${myFollowers.meta.currentPage + 1}`)}
                    >Next</button>
                    )
                  }
                  {
                    myFollowers?.meta?.currentPage !== 1 && myFollowers?.meta?.currentPage <= myFollowers?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => push(`/my/profile/?page=${myFollowers.meta.currentPage - 1}`)}
                    >Previous</button>
                    )
                  }
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default ProfileTabs
