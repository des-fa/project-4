import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'

import { Image } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'

import useCountryReviews from '@/hooks/countries/country-reviews'
import useCountryPlans from '@/hooks/countries/country-plans'
import FormCountrySearch from '@/forms/CountryCitySearch'
import WeatherChart from '../WeatherChart'

function CountryTabs({ countryIso2, countryNews, citiesOptions, setCityCoordinates, weatherInfo }) {
  const { push, replace } = useRouter()

  const { publicPlans, isLoadingPlans } = useCountryPlans()
  const { countryReviews, isLoadingReviews } = useCountryReviews()

  const [reviewsArray, setReviewsArray] = useState(null)
  const [showCitySearchMsg, setShowCitySearchMsg] = useState(false)

  const newsArticles = countryNews?.articles?.length > 0 ? (
    <>
      <h3 className="text-white fw-light mb-3 ms-4">Latest headlines</h3>

      <div className="row row-cols-1 row-cols-lg-2 g-3 px-3 py-2">
        {countryNews?.articles.map((article, i) => (
          <div key={i} className="d-flex flex-column align-items-center mb-1">
            <div key={i} className="card country-card h-100" style={{ width: '18rem' }}>
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
                className="action-btn bi bi-book-half"
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
    <h3 className="text-white fw-light m-4">No recent news was found.</h3>
  )

  const handleClickTipCity = async (city, state) => {
    const response = await axios.get(`https://nominatim.openstreetmap.org/?city=${city}&state=${state}&countrycode=${countryIso2.toLowerCase()}&limit=1&format=json`)
    const result = response.data[0] ? (response.data[0]) : (null)
    // console.log(result)
    if (result) {
      setCityCoordinates({ lat: result?.lat, long: result?.lon, name: result?.display_name })
    }
  }

  // console.log('reviews', countryReviews?.reviews)

  const handleChange = async (value) => {
    // console.log(value?.value)
    await axios({
      method: 'GET',
      url: `/api/countries/${countryIso2}/reviews`,
      params: { q: value?.value }
    })
      .then((resp) => {
        if (resp?.data?.reviews) {
          setReviewsArray(resp?.data?.reviews)
        }
        if (resp?.data?.reviews?.length === 0) {
          setShowCitySearchMsg(true)
        } else {
          setShowCitySearchMsg(false)
        }
      }
      )
  }

  let reviews

  useEffect(() => {
    if (countryReviews?.reviews?.length !== 0) {
      setReviewsArray(countryReviews?.reviews)
      // console.log('reviews array', reviewsArray)
    }
  }, [countryReviews])

  if (isLoadingReviews) {
    reviews = <h3 className="text-white fw-light m-4">Loading...</h3>
  }
  if (countryReviews?.reviews?.length === 0) {
    reviews = <h3 className="text-white fw-light m-4">No reviews have been made yet.</h3>
  } else {
    // console.log('OG', countryReviews?.reviews)
    reviews = (
      <>
        <h3 className="text-white fw-light mb-3 ms-5">Users&apos; thoughts</h3>

        <div className="d-flex flex-column justify-content-center w-75 ms-5 my-4 text-dark">
          <h6>Search reviews by city:</h6>
          <div className="border rounded p-2">
            <FormCountrySearch options={citiesOptions} handleChange={handleChange} />
          </div>
        </div>

        <h6
          className="fw-light text-white ms-5 my-4"
          style={{ display: showCitySearchMsg ? '' : 'none' }}
        >No reviews were found. Please enter another city to try again!</h6>

        <div className="d-flex flex-column justify-content-center py-2 px-5">
          {reviewsArray?.map((review, i) => (
            <div key={i} className="card country-card mb-3 w-100">
              <div className="d-flex flex-lg-row flex-column gap-2 p-4">
                <div className="col-md-3 text-center m-2">
                  <Image
                    className="rounded"
                    src={review?.user?.profile?.avatar}
                    alt="user-profile-pic"
                    style={{ width: '100px' }}
                  />
                </div>

                <div className="col-md-8 my-2 pt-3">
                  <div className="d-flex flex-lg-row flex-column justify-content-between align-items-start px-2 mb-2">
                    <div className="d-flex flex-column">
                      <a href={`/users/${review?.userId}`} className="text-decoration-none link-dark">
                        <h4 className="action-title mb-2 text-uppercase">{review?.user?.profile?.fullName}</h4>
                      </a>
                      <p className="text-left">
                        <Image src="/images/star.png" alt="star" />
                        <span className="text-muted ms-2">{review?.rating}.0</span>
                      </p>
                    </div>

                    <div className="d-flex flex-row align-items-center gap-2">
                      <Image
                        src="/images/calendar.png"
                        alt="calendar-icon"
                        width="20"
                      />
                      <p className="text-muted mb-0">{review?.month} / {review?.year}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="row text-left px-4"
                style={{ display: review?.tips?.length > 0 ? '' : 'none' }}
              >
                <h5 className="my-3 text-muted">Visited Cities</h5>
                {
                  review?.tips?.length > 0 ? (
                    review?.tips?.map((tip, index) => (
                      <div key={index} className="mb-2">
                        <div className="d-flex flex-row">
                          <div className="d-flex flex-column me-2">
                            <Image
                              src="/images/pin.png"
                              alt="pin-icon"
                              height="20"
                            />
                          </div>
                          <div className="col">
                            <a href="#" className="text-decoration-none link-dark">
                              <h6
                                className="action-title mb-1 fw-semibold"
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleClickTipCity(tip.city, tip.stateName)
                                }}
                              >{tip.city}, {tip.stateName}</h6>
                            </a>
                            <p>{tip.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    null
                  )
                }
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  let meetUpPlans
  if (isLoadingPlans) {
    meetUpPlans = <h3 className="text-white fw-light m-4">Loading...</h3>
  }
  if (publicPlans?.plans?.length === 0) {
    meetUpPlans = <h3 className="text-white fw-light m-4">No travel plans have been shared yet.</h3>
  } else {
    meetUpPlans = (
      <>
        <h3 className="text-white fw-light mb-3 ms-5">Current travel plans</h3>

        <div className="d-flex flex-column justify-content-center align-items-center py-2">
          {publicPlans?.plans.map((plan, i) => (
            <div key={i} className="card country-card mb-3 w-100" style={{ maxWidth: '550px', maxHeight: '100px' }}>
              <div className="row g-0 h-100">
                <div className="col-2 text-center">
                  <Image
                    src={plan?.user?.profile?.avatar}
                    className="p-2 rounded img-fluid"
                    style={{ maxHeight: '100px' }}
                    alt="user-profile-pic"
                  />
                </div>
                <div className="col-10 px-4 py-3 h-100">
                  <a href={`/users/${plan?.userId}`} className="text-decoration-none link-dark">
                    <h5 className="action-title card-title fw-semibold text-uppercase mb-3">{plan?.user?.profile?.fullName}</h5>
                  </a>
                  <p className="text-muted mb-0">
                    <Image
                      className="me-2"
                      src="/images/calendar.png"
                      alt="calendar-icon"
                      width="20"
                    />
                    {plan?.month} / {plan?.year}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }

  return (
    <Tab.Container
      defaultActiveKey="weather"
      onSelect={() => {
        replace(`/countries/${countryIso2}`, undefined, { shallow: true })
        // console.log(k)
      }}
    >
      <div className="gap-5 h-100 d-flex flex-lg-row flex-column justify-content-center">
        <Col lg={1} className="mb-4">
          <Nav
            variant="pills"
            className="d-flex flex-column text-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="weather">Weather</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="news">News</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="reviews">Reviews</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="plans">Meet Up</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col lg={10} className="p-4 h-100">
          <Tab.Content>
            <Tab.Pane eventKey="weather">
              <WeatherChart weatherInfo={weatherInfo} />
            </Tab.Pane>

            <Tab.Pane eventKey="news">
              {newsArticles}
            </Tab.Pane>

            <Tab.Pane eventKey="reviews">
              {reviews}

              <div className="d-flex flex-row justify-content-center mt-4">
                {
                    countryReviews?.meta?.currentPage >= 1 && countryReviews?.meta?.currentPage < countryReviews?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-dark px-3 py-2 me-3"
                      onClick={() => push(`/countries/${countryIso2}/?page=${countryReviews.meta.currentPage + 1}`)}
                    >Next</button>
                    )
                  }
                {
                    countryReviews?.meta?.currentPage !== 1 && countryReviews?.meta?.currentPage <= countryReviews?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary px-3 py-2"
                      onClick={() => push(`/countries/${countryIso2}/?page=${countryReviews.meta.currentPage - 1}`)}
                    >Previous</button>
                    )
                  }
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="plans">
              {meetUpPlans}

              <div className="d-flex flex-row justify-content-center mt-4">
                {
                    publicPlans?.meta?.currentPage >= 1 && publicPlans?.meta?.currentPage < publicPlans?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-dark px-3 py-2 me-3"
                      onClick={() => push(`/countries/${countryIso2}/?page=${publicPlans.meta.currentPage + 1}`)}
                    >Next</button>
                    )
                  }
                {
                    publicPlans?.meta?.currentPage !== 1 && publicPlans?.meta?.currentPage <= publicPlans?.meta?.totalPages && (
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary px-3 py-2"
                      onClick={() => push(`/countries/${countryIso2}/?page=${publicPlans.meta.currentPage - 1}`)}
                    >Previous</button>
                    )
                  }
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </div>
    </Tab.Container>
  )
}

export default CountryTabs
