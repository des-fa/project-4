import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import FormCountrySearch from '@/forms/CountryCitySearch'
import useMyPlans from '@/hooks/my/plans'

const initialValues = {
  iso2: '',
  countryName: '',
  month: '',
  year: '',
  isPublic: false
}

const yearOptions = []
const year = new Date().getFullYear()
// console.log(typeof year)
for (let index = 0; index <= 10; index += 1) {
  const years = year + index
  yearOptions.push(years)
}
// console.log(yearOptions)

const countrySearchOptions = ({ countryNameInitialValue, countryInfo, field,
  form: { setFieldValue }
  // ...props
}) => {
  const options = countryInfo?.map((country) => (
    { value: country.iso2, label: country.name }
  ))
  // console.log(countryNameInitialValue)

  return (
    <>
      <label htmlFor={field.name}>Country</label>
      <FormCountrySearch
        // className={`form-control ${e?.[field.name] && t?.[field.name] && 'is-invalid'}`}
        initialValue={countryNameInitialValue}
        options={options}
        handleChange={
          async (value) => {
            // console.log(value)
            setFieldValue('iso2', value?.value)
            setFieldValue('countryName', value?.label)
          }
        }
      />
      {/* <ErrorMessage
        className="invalid-feedback"
        name={field.name}
        component="div"
      /> */}
    </>
  )
}

function FormsProfilePlansChangeModal(props) {
  // console.log('initial', props?.initialValues)

  const { createMyPlans, updateMyPlans } = useMyPlans()

  const handleSubmit = props.initialValues ? (
    async (values) => {
      await updateMyPlans(values)
        .then(() => {
          // console.log(values)
          props.setEditPlansModalShow(false)
        })
    }
  ) : (
    async (values) => {
      await createMyPlans(values)
        .then(() => {
          // console.log(values)
          props.onHide()
        })
    }
  )

  return (
    <Modal
      {...props}
      // backdrop="static"
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
            Edit your travel plan
          </Modal.Title>
        ) : (

          <Modal.Title id="contained-modal-title-vcenter">
            Enter details about your travel plans
          </Modal.Title>
        )
      }
      </Modal.Header>

      <Formik
        initialValues={props.initialValues || initialValues}
        onSubmit={
          // (values) => { console.log(values) }
        handleSubmit
          }
        enableReinitialize
        validationSchema={
        Yup.object({
          iso2: Yup.string().uppercase().required(),
          countryName: Yup.string().required().label('Country Name'),
          month: Yup
            .number()
            .integer()
            .min(1, 'This month does not exist')
            .max(12, 'This month does not exist')
            .required()
            .label('Month'),
          year: Yup
            .number()
            .integer()
            .test('len', 'Must be exactly 4 numbers', (val) => !val || val.toString().length === 4)
            .required()
            .label('Year'),
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
                 //  className={`form-control ${e?.countryName && t?.countryName && 'is-invalid'}`}
                  name="countryName"
                  countryNameInitialValue={props?.initialValues?.iso2}
                  countryInfo={props?.countryInfo}
                  component={countrySearchOptions}
                />
                {/* <ErrorMessage
                  className="invalid-feedback"
                  name="countryName"
                  component="div"
                /> */}
              </div>

              <div className="d-flex flex-row gap-3 mb-3">
                <div className="w-50">
                  <label htmlFor="month">Month</label>
                  <Field
                    className={`form-control ${e?.month && t?.month && 'is-invalid'}`}
                    as="select"
                    name="month"
                  >
                    <option>Select a month...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </Field>
                  <ErrorMessage
                    className="invalid-feedback"
                    name="month"
                    component="div"
                  />
                </div>

                <div className="w-50">
                  <label htmlFor="year">Year</label>
                  <Field
                    className={`form-control ${e?.year && t?.year && 'is-invalid'}`}
                    as="select"
                    name="year"
                  >
                    <option>Select a year...</option>
                    {
                    yearOptions.map((option, i) => (
                      <option key={i} value={option}>{option}</option>
                    ))
                  }
                  </Field>
                  <ErrorMessage
                    className="invalid-feedback"
                    name="year"
                    component="div"
                  />
                </div>
              </div>

              <div className="d-flex flex-row gap-3 mb-3">
                <Field type="checkbox" name="isPublic" />
                Public
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
