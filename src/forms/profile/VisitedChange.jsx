import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import FormCountrySearch from '@/forms/CountryCitySearch'
import useMyVisitedCountries from '@/hooks/my/visited-countries'

const initialValues = {
  iso2: '',
  countryName: '',
  month: '',
  year: '',
  rating: '',
  tips: []
}

const yearOptions = []
const year = new Date().getFullYear()
for (let index = 0; index <= 10; index += 1) {
  const years = year - index
  yearOptions.push(years)
}

const stateInfoApi = async (country) => {
  const resp = await axios({
    method: 'GET',
    url: `https://api.countrystatecity.in/v1/countries/${country}/states`,
    headers: {
      'X-CSCAPI-KEY': 'VU1VSFd6Znc3MkZqTVF5aUxJTkJQeHBidlBsUDYybjlkS0haMm1pTQ=='
    }
  })
  return resp.data
}

const cityInfoApi = async (country, state) => {
  // console.log(country)
  // console.log(state)
  const resp = await axios({
    method: 'GET',
    url: `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
    headers: {
      'X-CSCAPI-KEY': 'VU1VSFd6Znc3MkZqTVF5aUxJTkJQeHBidlBsUDYybjlkS0haMm1pTQ=='
    }
  })
  return resp.data
}

const CountrySearchOptions = ({ countryInitialIso2, countryInitialName, countryInfo, setCountryIso2, setStateList, field, form: { setFieldValue }
  // , ...props
}) => {
  const countryOptions = countryInfo?.map((country) => (
    { value: country.iso2, label: country.name }
  ))

  useEffect(() => {
    if (countryInitialIso2) {
      setCountryIso2(countryInitialIso2)
      setFieldValue('iso2', countryInitialIso2)
      setFieldValue('countryName', countryInitialName)
      stateInfoApi(countryInitialIso2).then((resp) => setStateList(resp))
    }
  }, [countryInitialIso2])

  return (
    <>
      <label htmlFor={field.name}>Country</label>
      <FormCountrySearch
        initialValue={countryInitialIso2}
        options={countryOptions}
        handleChange={
          async (value) => {
            // console.log(value)
            if (value) {
              setCountryIso2(value?.value)
              setFieldValue('iso2', value?.value)
              setFieldValue('countryName', value?.label)
              stateInfoApi(value?.value).then((resp) => setStateList(resp))
            }
          }
        }
      />
    </>
  )
}

const StateSearchOptions = ({ stateInitialIso2, stateInitialName, countryIso2, stateList, index, setCityList, field, form: { setFieldValue }
}) => {
  const stateOptions = stateList?.map((state) => (
    // console.log(state)
    { value: state.iso2, label: state.name }
  ))
  console.log(stateInitialIso2)
  // console.log(stateInitialName)
  console.log('country', countryIso2)

  useEffect(() => {
    if (stateInitialIso2) {
      setFieldValue(field.name, stateInitialName)
      setFieldValue(`tips[${index}].stateIso2`, stateInitialIso2)
      console.log('country', countryIso2)
      // cityInfoApi(countryIso2, stateInitialIso2).then((resp) => setCityList(resp))
    }
  }, [stateInitialIso2])

  return (
    <>
      <label htmlFor={field.name}>State/Province/County</label>
      <FormCountrySearch
        initialValue={stateInitialIso2}
        options={stateOptions}
        handleChange={
          async (value) => {
            // console.log(value)
            if (value) {
              setFieldValue(field.name, value?.label)
              setFieldValue(`tips[${index}].stateIso2`, value?.value)
              cityInfoApi(countryIso2, value?.value).then((resp) => setCityList(resp))
            }
          }
        }
      />
    </>
  )
}

const citySearchOptions = ({ cityNameInitialValue, cityList, field, form: { setFieldValue }
}) => {
  const cityOptions = cityList?.map((city) => (
    // console.log(city)
    { value: city.name, label: city.name }
  ))

  return (
    <>
      <label htmlFor={field.name}>City</label>
      <FormCountrySearch
        initialValue={cityNameInitialValue}
        options={cityOptions}
        handleChange={
          async (value) => {
            // console.log(value)
            setFieldValue(field.name, value?.value)
          }
        }
      />
    </>
  )
}

function FormsProfileVisitedChangeModal(props) {
  // console.log('initial', props?.initialValues)
  // console.log('countryiso2', props?.countryNameInitialValue)

  const [countryIso2, setCountryIso2] = useState('')
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])
  const { createMyVisitedCountries, updateMyVisitedCountries } = useMyVisitedCountries()

  const handleSubmit = props.initialValues ? (
    async (values) => {
      await updateMyVisitedCountries(values)
        .then(() => {
          console.log(values)
          props.setEditVisitedModalShow(false)
        })
    }
  ) : (
    async (values) => {
      await createMyVisitedCountries(values)
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
            Edit your past trip record
          </Modal.Title>
        ) : (

          <Modal.Title id="contained-modal-title-vcenter">
            Enter details about your past trip
          </Modal.Title>
        )
      }
      </Modal.Header>

      <Formik
        initialValues={props?.initialValues || initialValues}
        onSubmit={
          // (values) => {
          //   console.log(values)
          // }
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
          rating: Yup.number().integer().required().label('Rating'),
          tips: Yup.array().of(
            Yup.object({
              stateIso2: Yup.string().required().label('This'),
              stateName: Yup.string().required().label('This'),
              city: Yup.string().required().label('This'),
              content: Yup.string().required().label('This')
            })
          )
        })
      }
      >
        {
        ({ values, errors: e, touched: t, isSubmitting }) => (
          <Form>
            <Modal.Body>
              <div className="mb-3">
                <Field
                  name="countryName"
                  countryInitialIso2={props?.countryInitialIso2 || props?.initialValues?.iso2}
                  countryInitialName={props?.countryInitialName || props?.initialValues?.countryName}
                  countryInfo={props?.countryInfo}
                  setCountryIso2={setCountryIso2}
                  setStateList={setStateList}
                  component={CountrySearchOptions}
                />
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
                <div className="w-50">
                  <label htmlFor="rating">Rating</label>
                  <Field
                    className={`form-control ${e?.rating && t?.rating && 'is-invalid'}`}
                    as="select"
                    name="rating"
                  >
                    <option>Select a rating...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Field>
                  <ErrorMessage
                    className="invalid-feedback"
                    name="rating"
                    component="div"
                  />
                </div>
              </div>

              <FieldArray name="tips">
                {
                ({ remove, push }) => (
                  <div>
                    {
                      values.tips.map((item, i) => (
                        <div key={i} className={`py-3 ${values?.tips?.length > 1 && values?.tips?.length !== i + 1 && 'border-bottom border-secondary'}`}>
                          <div className="d-flex flex-row justify-content-between w-100 mb-3">
                            <p className="fw-semibold mb-0">Tip {i + 1}</p>
                            <button className="btn btn-danger btn-sm py-0" type="button" onClick={() => remove(i)}>x</button>
                          </div>

                          {/* {console.log('tip', props?.initialValues?.tips[i])} */}

                          <div className="mb-3">
                            <Field
                              name={`tips[${i}].stateName`}
                              index={i}
                              countryIso2={countryIso2}
                              stateInitialIso2={props?.initialValues?.tips[i]?.stateIso2}
                              stateInitialName={props?.initialValues?.tips[i]?.stateName}
                              stateList={stateList}
                              setCityList={setCityList}
                              component={StateSearchOptions}
                            />
                          </div>

                          <div className="mb-3">
                            <Field
                              name={`tips[${i}].city`}
                              cityList={cityList}
                              component={citySearchOptions}
                            />
                          </div>

                          <div className="mb-3">
                            <Field
                              className={`form-control ${e?.tips?.[i]?.content && t?.tips?.[i]?.content && 'is-invalid'}`}
                              name={`tips[${i}].content`}
                              as="textarea"
                              rows="5"
                              placeholder="Share some details about your experience that might be helpful for other travellers visiting this city!"
                            />
                            <ErrorMessage className="invalid-feedback" name={`tips[${i}].content`} component="div" />
                          </div>
                        </div>
                      ))
                    }

                    <div className="text-start">
                      <button className="btn btn-outline-dark" type="button" onClick={() => push({ city: '', content: '' })}>Add a Tip</button>
                    </div>
                  </div>
                )
              }
              </FieldArray>
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
                  >Create</Button>
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

export default FormsProfileVisitedChangeModal
