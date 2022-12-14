import { Image } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'

import useCountryReviews from '@/hooks/country-reviews'
import useCountryPlans from '@/hooks/country-plans'

function CountryTabs({ countryNews }) {
  const { publicPlans, isLoadingPlans } = useCountryPlans()
  const { countryReviews, isLoadingReviews } = useCountryReviews()

  console.log(countryReviews)

  const newsArticles = countryNews?.articles?.length > 0 ? (
    <>
      <h3 className="text-muted fw-light mb-3 ms-4">Latest headlines</h3>

      <div className="row row-cols-1 row-cols-md-2 g-3 px-3 py-2">
        {countryNews?.articles.map((article, i) => (
          <div key={i} className="d-flex flex-column align-items-center mb-1">
            <div key={i} className="card h-100" style={{ width: '18rem' }}>
              <Image className="card-img-top" src={article?.urlToImage || '/images/news.png'} alt="news-article-img" width={100} />

              <div className="card-body h-100">
                <h6 className="card-title">{article?.title}</h6>
                {/* <p>{article?.description}</p> */}
              </div>
              <a
                href={article?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none link-dark ms-auto me-4 mb-2 mt-0"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-book-half"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
              </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <h3 className="text-muted fw-light m-4">No recent news was found.</h3>
  )
  let reviews
  if (isLoadingReviews) {
    reviews = <h3 className="text-muted fw-light m-4">Loading..</h3>
  }
  if (countryReviews?.reviews?.length === 0) {
    reviews = <h3 className="text-muted fw-light m-4">No reviews have been made yet.</h3>
  } else {
    reviews = (
      <>
        <h3 className="text-muted fw-light mb-3 ms-5">Users&apos; thoughts</h3>

        <div className="d-flex flex-row justify-content-center py-2 px-5" style={{ minWidth: '550px' }}>
          {countryReviews?.reviews.map((review, i) => (
            <div key={i} className="card mb-3">
              <div className="d-flex flex-lg-row flex-column py-2">
                <div className="col-md-3 text-center my-2 me-2">
                  <Image
                    className="rounded rounded-circle"
                    src={review?.user?.profile?.avatar}
                    alt="user-profile-pic"
                    style={{ width: '100px' }}
                  />
                </div>

                <div className="col-md-8 my-2">
                  <div className="d-flex flex-row justify-content-between align-items-center px-2 mb-2">
                    <a href={`/users/${review?.userId}`} className="text-decoration-none link-dark">
                      <h4 className="mt-2 mb-0 text-capitalize">{review?.user?.profile?.fullName}</h4>
                    </a>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <Image src="/images/passenger.png" alt="traveler" />
                      <p className="text-muted mb-0">{review?.month} / {review?.year}</p>
                    </div>
                  </div>

                  <div className="d-flex flex-row px-2">
                    <p className="text-left">
                      <Image src="/images/star.png" alt="star" />
                      <span className="text-muted ms-2">{review?.rating}.0</span>
                    </p>
                  </div>
                </div>
              </div>

              { review?.tips?.length > 0 ? (
                <div className="row text-left px-3">
                  <h5 className="mt-3">Visited Cities</h5>
                  <p className="content">If you really enjoy spending your vacation or would like to try something new and exciting for the first time.</p>
                </div>
              ) : (
                null
              )}

            </div>
          ))}
        </div>
      </>
    )
  }

  let meetUpPlans
  if (isLoadingPlans) {
    meetUpPlans = <h3 className="text-muted fw-light m-4">Loading..</h3>
  }
  if (publicPlans?.plans?.length === 0) {
    meetUpPlans = <h3 className="text-muted fw-light m-4">No travel plans have been shared yet.</h3>
  } else {
    meetUpPlans = (
      <>
        <h3 className="text-muted fw-light mb-3 ms-5">Current travel plans</h3>

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
                      <h5 className="card-title fw-bold text-uppercase  mb-3">{plan?.user?.profile?.fullName}</h5>
                    </a>
                    <p className="card-text text-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-airplane-fill me-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z" />
                      </svg>
                      {plan?.month} / {plan?.year}
                    </p>
                    <div className="d-flex flex-row justify-content-end me-2">
                      <a href={`/users/${plan?.userId}`} className="text-decoration-none link-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

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
              {reviews}
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
