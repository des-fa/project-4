import { Image } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'

import useCountry from '@/hooks/country'

function CountryTabs({ countryNews }) {
  const { publicPlans, isLoading } = useCountry()
  console.log(publicPlans)

  let meetUpPlans
  if (isLoading) {
    meetUpPlans = <h4 className="text-muted m-3 fw-light">Loading..</h4>
  }
  if (publicPlans?.plans?.length === 0) {
    meetUpPlans = <h4 className="text-muted m-3 fw-light">There are no travel plans shared yet.</h4>
  } else {
    meetUpPlans = (
      <>
        <h4 className="text-muted fw-light mb-3 ms-5">Current travel plans</h4>
        <div className="d-flex flex-row justify-content-center py-2">
          {publicPlans?.plans.map((plan, i) => (
            <div key={i} className="card mb-3 w-75" style={{ maxWidth: '450px' }}>
              <div className="row g-0">
                <div className="col-md-4 text-center">
                  <Image src={plan?.user?.profile?.avatar} className="img-fluid p-2 rounded-start" alt="user-profile-pic" />
                </div>
                <div className="col-md-8 py-2 ps-3 bg-light">
                  <div className="card-body">
                    <a href={`/users/${plan?.userId}`} className="text-decoration-none link-dark">
                      <h5 className="card-title text-uppercase">{plan?.user?.profile?.fullName}</h5>
                    </a>
                    <p className="card-text text-muted">Travelling in {plan?.month}/{plan?.year}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  const newsArticles = countryNews?.articles?.length > 0 ? (
    <div className="row row-cols-1 row-cols-md-2 g-3 px-3 py-2">
      {countryNews?.articles.map((article, i) => (
        <div key={i} className="d-flex flex-column align-items-center mb-1">
          <div key={i} className="card h-100" style={{ width: '18rem' }}>
            <Image className="card-img-top" src={article?.urlToImage} alt="news-article-img" width={100} />

            <div className="card-body h-100">
              <h6 className="card-title">{article?.title}</h6>
              {/* <p>{article?.description}</p> */}
            </div>
            <a
              href={article?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-secondary ms-auto me-2 mb-2 mt-0 w-50"
            >Read More</a>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <h4 className="text-muted m-3 fw-light">No recent news was found.</h4>
  )

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3} className="mb-4">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Weather</Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link eventKey="second">Visas</Nav.Link>
            </Nav.Item> */}
            <Nav.Item>
              <Nav.Link eventKey="third">News</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">Reviews</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fifth">Meet Up</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <p>hi</p>
            </Tab.Pane>

            <Tab.Pane eventKey="third">
              {newsArticles}
            </Tab.Pane>

            <Tab.Pane eventKey="fourth">
              <h1>Reviews</h1>
            </Tab.Pane>

            <Tab.Pane eventKey="fifth">
              {meetUpPlans}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default CountryTabs
