import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import countriesData from '../../data/countries.json'

const initialValues = {
  country: '',
  state: '',
  city: '' }

function FormsCountrySearch() {
  const [state, setstate] = useState({
    query: '',
    list: []
  })
  const handleChange = (e) => {
    const results = countriesData.filter((country) => {
      if (e.target.value === '') return countriesData.name
      return country.name.includes(e.target.value)
    })
    setstate({
      query: e.target.value,
      list: results
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(JSON.stringify(values))}
      enableReinitialize
    >
      {
      ({ errors: e, touched: t, isSubmitting, setFieldValue }) => (
        <Form>
          <div className="d-flex flex-column me-3">
            <Field
                // className={`form-control ${e?.q && t?.q && 'is-invalid'}`}
              name="country"
              placeholder="Search By Country"
              onChange={handleChange
              //   async (event) => {
              //   await setFieldValue('country', event.target.value)
              //   setstate({
              //     query: event.target.value,
              //     list: results
              //   })
              // }
              }
            />
          </div>
        </Form>
      )
      }
    </Formik>
  )
}

export default FormsCountrySearch
