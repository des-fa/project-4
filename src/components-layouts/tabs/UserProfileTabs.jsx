import { useRouter } from 'next/router'
import React from 'react'

import { Image } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'

function UserProfileTabs({ userId, userVisitedCountries, isLoadingVisitedCountries, userPlans, isLoadingPlans }) {
  const { push, replace } = useRouter()
  // console.log('visited', userVisitedCountries)
  // console.log('plans', userPlans)

  let visited
  if (isLoadingVisitedCountries) {
    visited = (
      <div>
        <h5 className="text-white fw-light m-4">Loading....</h5>
      </div>
    )
  } if (userVisitedCountries?.visitedCountries?.length > 0) {
    visited = (
      userVisitedCountries?.visitedCountries?.map((country, i) => (
        <div
          key={i}
          className="profile-tabs-card rounded mb-3 px-3 pt-4 pb-3 mx-2"
        >
          <div className="d-flex flex-row  justify-content-between align-items-center">
            <div className="ps-3">
              <a
                className="text-decoration-none link-dark"
                href={`/countries/${country?.iso2}`}
              >
                <h4 className="action-title text-decoration-underline fw-light">{country?.countryName}</h4>
              </a>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-3 mt-1 ps-3">
            <Image
              className="me-2"
              src="/images/star.png"
              alt="calendar-icon"
              width="20"
            />
            <p className="mb-0 fw-semibold text-muted">{country?.rating}.0</p>
          </div>

          <div className="d-flex flex-row align-items-center mb-4 ps-3">
            <Image
              className="me-2"
              src="/images/calendar.png"
              alt="calendar-icon"
              width="20"
            />
            <p className="mb-0 fw-bold">{country?.month} / {country?.year}</p>
          </div>

          {
          country?.tips ? (
            country?.tips?.map((tip, index) => (
              <div key={index} className="my-2 ps-3">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column me-2">
                    <Image
                      src="/images/pin.png"
                      alt="pin-icon"
                      height="20"
                    />
                  </div>

                  <div className="col">
                    <h5>{tip?.city}, {tip?.stateName}</h5>
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
  } if (userVisitedCountries?.visitedCountries?.length === 0) {
    visited = (
      <h3 className="text-white fw-light m-4">This user hasn&apos;t added any information about their past travels yet.</h3>
    )
  }

  let plans
  if (isLoadingPlans) {
    plans = (
      <div>
        <h5 className="text-white fw-light m-4">Loading....</h5>
      </div>
    )
  } if (userPlans?.plans?.length > 0) {
    plans = (
      userPlans?.plans?.map((plan, i) => (
        <div
          key={i}
          className="profile-tabs-card rounded mb-3 px-3 py-3 mx-2"
        >
          <div className="d-flex flex-row  justify-content-between align-items-center mb-2">
            <div className="ps-3">
              <a
                className="text-decoration-none link-dark"
                href={`/countries/${plan?.iso2}`}
              >
                <h4 className="action-title text-decoration-underline fw-light">{plan?.countryName}</h4>
              </a>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-1 ps-3">
            <Image
              className="me-2"
              src="/images/calendar.png"
              alt="calendar-icon"
              width="20"
            />
            <p className="mb-0 fw-bold">{plan?.month} / {plan?.year}</p>
          </div>
        </div>
      ))
    )
  } if (userPlans?.plans?.length === 0) {
    plans = (
      <h3 className="text-white fw-light m-4">This user hasn&apos;t made any travel plans yet.</h3>
    )
  }

  return (
    <Tab.Container
      defaultActiveKey="visited"
      onSelect={() => {
        replace(`/users/${userId}`, undefined, { shallow: true })
        // console.log(k)
      }}
    >
      <Row>
        <Col sm={3} className="mb-3">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="visited">Visited</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="plans">Travel Plans</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="visited">
              <div className="my-2 px-3">
                {visited}

                <div className="d-flex flex-row justify-content-center mt-4">
                  {
                    userVisitedCountries?.meta?.currentPage >= 1 && userVisitedCountries?.meta?.currentPage < userVisitedCountries?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-dark px-3 py-2 me-3"
                      onClick={() => push(`/users/${userId}/?page=${userVisitedCountries.meta.currentPage + 1}`)}
                    >Next</button>
                    )
                  }
                  {
                    userVisitedCountries?.meta?.currentPage !== 1 && userVisitedCountries?.meta?.currentPage <= userVisitedCountries?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => push(`/users/${userId}/?page=${userVisitedCountries.meta.currentPage - 1}`)}
                    >Previous</button>
                    )
                  }
                </div>
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="plans">
              <div className="my-2 px-3">
                {plans}

                <div className="d-flex flex-row justify-content-center mt-4">
                  {
                    userPlans?.meta?.currentPage >= 1 && userPlans?.meta?.currentPage < userPlans?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-dark px-3 py-2 me-3"
                      onClick={() => push(`/users/${userId}/?page=${userPlans.meta.currentPage + 1}`)}
                    >Next</button>
                    )
                  }
                  {
                    userPlans?.meta?.currentPage !== 1 && userPlans?.meta?.currentPage <= userPlans?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary px-3 py-2"
                      onClick={() => push(`/users/${userId}/?page=${userPlans.meta.currentPage - 1}`)}
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

export default UserProfileTabs
