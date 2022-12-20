import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

// import useMyProfile from '@/hooks/my/profile'
import FormCountrySearch from '@/forms/CountryCitySearch'

const initialValues = {
  // iso2: '',
  countryName: '',
  month: '',
  year: '',
  isPublic: ''
}

const countrySearchOptions = ({ countryInfo, field
  // form: { t, e }, ...props
}) => {
  const options = countryInfo?.map((country) => (
    { value: country.iso2, label: country.name }
  ))
  // console.log('options', options)
  return (
    <>
      <label htmlFor={field.name}>Countries</label>
      <FormCountrySearch options={options} />
    </>
  )
}

function FormsProfilePlansChangeModal(props) {
  // console.log(props?.countryInfo)

  // const { createMyProfile, updateMyProfile } = useMyProfile()

  // const handleSubmit = props.initialValues ? (
  //   async (values) => {
  //     await updateMyProfile(values)
  //       .then(() => {
  //         props.setEditModalShow(false)
  //         setInputText('')
  //       })
  //   }
  // ) : (
  //   async (values) => {
  //     await createMyProfile(values)
  //       .then(() => {
  //       // console.log(values)
  //         props.onHide()
  //       })
  //   }
  // )

  return (
    <Modal
      {...props}
      backdrop="static"
      keyboard={false}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        onClick={() => {
          props.onHide()
        }}
      >
        {
        props.initialValues ? (
          <Modal.Title id="contained-modal-title-vcenter">
            Edit your travel plans
          </Modal.Title>
        ) : (

          <Modal.Title id="contained-modal-title-vcenter">
            Create your travel plans
          </Modal.Title>
        )
      }
      </Modal.Header>

      <Formik
        initialValues={props.initialValues || initialValues}
        onSubmit={(values) => { console.log('values', values) }}
        // {handleSubmit}
        enableReinitialize
        validationSchema={
        Yup.object({
          countryName: Yup.string().required().label('Country Name'),
          month: Yup
            .number()
            .integer()
            .min(1, 'This month does not exist')
            .max(12, 'This month does not exist')
            .required(),
          year: Yup
            .number()
            .integer()
            .test('len', 'Must be exactly 4 numbers', (val) => !val || val.toString().length === 4)
            .required(),
          isPublic: Yup.boolean().transform((value) => (!!value))
        })
      }
      >
        {
        ({ errors: e, touched: t, isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div className="mb-3">
                <Field
                  // className={`form-control ${e?.countryName && t?.countryName && 'is-invalid'}`}
                  name="countryName"
                  countryInfo={props?.countryInfo}
                  component={countrySearchOptions}
                />
                {/* <ErrorMessage
                  className="invalid-feedback"
                  name="countryName"
                  component="div"
                /> */}
              </div>

              <div className="mb-3">
                <label>About you</label>
                <Field
                  className={`form-control ${e?.about && t?.about && 'is-invalid'}`}
                  name="about"
                  as="textarea"
                  rows="5"
                  placeholder="Share a little bit about yourself!"

                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="about"
                  component="div"
                />
              </div>

            </Modal.Body>

            {
              props.initialValues ? (
                <Modal.Footer>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      props.onHide()
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    className="btn btn-dark"
                    type="submit"
                    disabled={isSubmitting}
                  >Save Changes</Button>
                </Modal.Footer>
              ) : (

                <Modal.Footer>
                  <Button
                    className="btn btn-dark"
                    type="submit"
                    disabled={isSubmitting}
                  >Create Plan</Button>
                </Modal.Footer>

              )
            }

          </Form>
        )
      }
      </Formik>
    </Modal>
  )
}

export default FormsProfilePlansChangeModal
