import React from 'react'

import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  q: ''
}

// onChange={(event) => {
//                   setFieldValue('about', event.target.value)
//                   setInputText(event.target.value)
//                 }}

function FormsUserSearch(props) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.handleSubmit}
      // {(values) => {
      //   console.log(values)
      //   trigger(values)
      // }}
      enableReinitialize
      validationSchema={
      Yup.object({
        q: Yup.string().required().trim().label('Search query')
      })
      }
    >
      {
      ({ errors: e, touched: t, isSubmitting }) => (
        <Form>
          <div className="d-flex flex-row ms-4 gap-3 w-100">
            <Field
              className={`form-control ${e?.q && t?.q && 'is-invalid'}`}
              name="q"
              placeholder="Connect with others"
            />
            {/* <ErrorMessage
                className="invalid-feedback"
                name="q"
                component="div"
              /> */}

            <button
              className="btn btn-outline-secondary"
              type="submit"
              disabled={isSubmitting}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg></button>
          </div>
        </Form>
      )
      }
    </Formik>
  )
}

export default FormsUserSearch
