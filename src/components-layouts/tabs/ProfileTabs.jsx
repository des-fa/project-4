import Link from 'next/link'
import React from 'react'
import { Dropdown, Image } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'

function ProfileTabs({ countryInfo, mySavedCountries, myPlans }) {
  console.log(mySavedCountries)
  console.log(countryInfo)

  const saved = mySavedCountries ? (
    <h1>hi</h1>
  ) : (
    <>
      <h3 className="text-muted fw-light m-4">You don&apos;t any saved countries yet.</h3>
      <h5 className="fw-light m-4">
        <Link href="/countries"><a className="text-decoration-none link-dark fw-semibold">Search</a></Link> for countries to save!
      </h5>
    </>
  )

  const plans = myPlans ? (
    myPlans?.plans.map((plan, i) => (
      <div
        key={i}
        className="border-bottom border-gray mb-3 px-3 mx-2"
      >
        <div className="d-flex flex-row  justify-content-between align-items-center">
          <div>
            <a
              className="text-decoration-none link-dark"
              href={`/countries/${plan?.iso2}`}
            >
              <h5>{plan?.countryName}</h5>
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
                <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <div className="d-flex flex-row align-items-center mb-3">
          <Image
            className="me-2"
            src="/images/calendar.png"
            alt="calendar-icon"
            width="20"
          />
          <p className="mb-0">{plan?.month} / {plan?.year}</p>
        </div>
      </div>
    ))
  ) : (
    <h3 className="text-muted fw-light m-4">You haven&apos;t made any travel plans yet.</h3>
  )

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Visited</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Saved</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Travel Plans</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">Following</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fifth">Followers</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <p>hi</p>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              {saved}
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              <div className="my-2 px-3">
                <div className="d-flex flex-row justify-content-end px-4 mb-4">
                  <button type="button" className="btn btn-sm btn-dark px-3">
                    Add
                  </button>
                </div>
                {plans}
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default ProfileTabs
