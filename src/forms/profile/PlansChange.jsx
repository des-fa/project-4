import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

// import useMyProfile from '@/hooks/my/profile'
import FormCountrySearch from '@/forms/CountryCitySearch'

const initialValues = {
  iso2: '',
  countryName: '',
  month: '',
  year: '',
  isPublic: ''
}

const CountrySearchOptions = ({ ...props }) => {
  const options = props?.countryInfo?.countryInfo?.map((country) => (
    { value: country.iso2, label: country.name }
  ))
  return (
    <FormCountrySearch options={options} />
  )
}

function FormsProfilePlansChangeModal(props) {
  console.log(props?.countryInfo)

  // const { createMyProfile, updateMyProfile } = useMyProfile()

  // const CountrySearchComponent = ({ options }) => (
  //   <FormCountrySearch options={options} />
  // )

  // const CountrySearchInput = () => (
  //   <>

  //     <Field
  //       className={`form-control ${e?.countryName && t?.countryName && 'is-invalid'}`}
  //       name="countryName"
  //     >
  //       <CountrySearchComponent />
  //     </Field>
  //     <ErrorMessage
  //       className="invalid-feedback"
  //       name="countryName"
  //       component="div"
  //     />
  //   </>
  // )

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
        onSubmit={() => { console.log('submitted') }}
        // {handleSubmit}
        enableReinitialize
        validationSchema={
        Yup.object({
          avatar: Yup.mixed().required().label('Profile picture'),
          fullName: Yup.string()
            .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Please enter your full name.')
            .required()
            .label('Full name'),
          about: Yup
            .string()
            .trim()
            .max(400, 'Maximum 400 characters.')
            .required()
            .label('About me')
        })
      }
      >
        {
        ({ errors: e, touched: t, isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div className="mb-3">
                <label>Countries</label>
                <Field
                  className={`form-control ${e?.countryName && t?.countryName && 'is-invalid'}`}
                  name="countryName"
                  component={CountrySearchOptions}
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="countryName"
                  component="div"
                />
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
