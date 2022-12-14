import { Image } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'

function CountryTabs({ countryNews }) {
  const newsArticles = countryNews?.articles?.length > 0 ? (
    <div className="row row-cols-1 row-cols-md-2 g-3 px-3 py-2">
      {countryNews?.articles.map((article, i) => (
        <div className="d-flex flex-column align-items-center mb-1">
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
        <Col sm={3}>
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
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default CountryTabs
