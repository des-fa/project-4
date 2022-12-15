import React from 'react'

import withAuth from '@/hoc/withAuth'

function CountriesSearch() {
  return (
    <div className="container px-3">
      <div className="d-flex flex-column my-5 gap-5">
        <h3 className="text-muted fw-light m-4">Search for Countries</h3>

        <div className="row">
          <h1>Hello</h1>
        </div>
      </div>
    </div>

  )
}
export default withAuth(CountriesSearch)
