import React from 'react'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'

function ProfileTabs({ countryInfo, myPlans }) {
  console.log(myPlans)
  console.log(countryInfo)
  const plans = myPlans?.plans.map((plan, i) => (
    <div key={i}>
      <h5>{plan?.countryName}</h5>
      <p>{plan?.month} / {plan?.year}</p>
    </div>
  ))

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
              <p>hi</p>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
              {plans}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default ProfileTabs
