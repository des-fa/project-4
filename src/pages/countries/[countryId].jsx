import withAuth from '@/hoc/withAuth'
// import { useRouter } from 'next/router'
import React from 'react'

function Country({ data, id }) {
// calling code, emergency phone number, time-zone, driving side

  // const router = useRouter()
  // const { countryId } = router.query
  console.log('data', data)
  console.log('id', id)
  console.log(data?.currencies)
  // console.log(Object.keys(data?.currencies))

  // useEffect(async () => {
  //   try {
  //     const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryId}`)
  //     const data = await res.json()
  //     console.log(data)
  //     setCountryData(data)
  //     console.log('countrydata', countryData)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }, [])

  return (
    <div className="row mx-4 my-4">
      <div className="col">

        <div>
          <p>Continent: {data?.continents}</p>
          <p>Population: {data?.population}</p>
          <p>Capital: {data?.capital}</p>
          {Object.keys(data?.currencies).forEach((key) => {
            console.log(key, data?.currencies[key])
          })}
          <p>Languages:</p>
          <ul>
            {Object.values(data?.languages).map((value) => <li>{value}</li>)}
          </ul>
          <p>Driving Side: {data?.car.side}</p>
        </div>

        <iframe
          src={`https://www.travel-advisory.info/widget-no-js?countrycode=${id}`}
          className="rounded"
          style={{ minHeight: 220 }}
        >Country advisory by <a href="https://www.travel-advisory.info/" rel="nofollow">Travel-Advisory.info</a></iframe>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  // console.log(context.params.countryId)
  // Fetch data from external API
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${context.params.countryId}`)
  const data = await res.json()
  // Pass data to the page via props
  return { props: {
    data: data[0],
    id: context.params.countryId
  } }
}

export default withAuth(Country)
