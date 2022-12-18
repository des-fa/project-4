import React, { useEffect, useRef, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Badge, Image } from 'react-bootstrap'

import useMyProfile from '@/hooks/my/profile'

const initialValues = {
  avatar: '',
  fullName: '',
  about: ''
}

function FormsProfileChangeModal(props) {
  const [avatarPreview, setAvatarPreview] = useState(props?.initialValues?.avatar || '/images/defaultAvatar.png')
  const avatarRef = useRef(null)

  const [inputText, setInputText] = useState('')
  const [characterLimit] = useState(400)

  const { createMyProfile, updateMyProfile } = useMyProfile()

  // charCount when updating
  useEffect(() => {
    if (props?.initialValues?.about) {
      setInputText(props?.initialValues?.about)
    }
  }, [props?.show])

  const handleSubmit = props.initialValues ? (
    async (values) => {
      await updateMyProfile(values)
        .then(() => {
          props.setEditModalShow(false)
          setInputText('')
          // navigate('/my/profile')
        })
    }
  ) : (
    async (values) => {
      await createMyProfile(values)
        .then(() => {
        // console.log(values)
          props.onHide()
          // navigate('/my/profile')
        })
    }
  )

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
          setInputText('')
          setAvatarPreview(props?.initialValues?.avatar || '/images/defaultAvatar.png')
          avatarRef.current.value = null
        }}
      >
        {
        props.initialValues ? (
          <Modal.Title id="contained-modal-title-vcenter">
            Edit your profile
          </Modal.Title>
        ) : (

          <Modal.Title id="contained-modal-title-vcenter">
            Create your profile
          </Modal.Title>
        )
      }
      </Modal.Header>

      <Formik
        initialValues={props.initialValues || initialValues}
        onSubmit={handleSubmit}
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
        ({ errors: e, touched: t, isSubmitting, setFieldValue }) => (
          <Form>
            <Modal.Body>
              <div className="d-flex flex-row justify-content-start align-items-center mb-3">
                <div className="col-3 me-2">
                  <Image
                    src={avatarPreview}
                    alt="profile-picture-preview"
                    className="img-thumbnail rounded-5"
                    width="100px"
                  />
                </div>

                <div className="col w-100">
                  <div className="input-group input-group-sm mb-3">
                    <label className="input-group-text" htmlFor="avatar">Upload</label>
                    <input
                      ref={avatarRef}
                      id="avatar"
                      className={`form-control ${e?.avatar && 'is-invalid'}`}
                      name="avatar"
                      type="file"
                      onChange={(event) => {
                        const fileReader = new FileReader()
                        fileReader.onload = () => {
                          if (fileReader.readyState === 2) {
                            setFieldValue('avatar', fileReader.result)
                            setAvatarPreview(fileReader.result)
                          }
                        }
                        fileReader.readAsDataURL(event.target.files[0])
                      }}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      onClick={() => {
                        setAvatarPreview(props?.initialValues?.avatar)
                        setFieldValue('avatar', '')
                        avatarRef.current.value = null
                      }}
                    >X</button>

                    <ErrorMessage
                      className="invalid-feedback"
                      name="avatar"
                      component="div"
                    />

                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label>Full Name</label>
                <Field
                  className={`form-control ${e?.fullName && t?.fullName && 'is-invalid'}`}
                  name="fullName"
                  placeholder="What is your full name?"
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="fullName"
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
                  onChange={(event) => {
                    setFieldValue('about', event.target.value)
                    setInputText(event.target.value)
                  }}
                />
                <ErrorMessage
                  className="invalid-feedback"
                  name="about"
                  component="div"
                />
                <div className="d-flex flex-row justify-content-start mb-0">
                  <Badge className="mt-2" bg={`${inputText.length > characterLimit ? 'danger' : 'secondary'}`}>{inputText.length} / {characterLimit}</Badge>
                </div>
              </div>

            </Modal.Body>

            {
              props.initialValues ? (
                <Modal.Footer>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      props.onHide()
                      setInputText('')
                      setAvatarPreview(props?.initialValues?.avatar)
                      setFieldValue('avatar', '')
                      avatarRef.current.value = null
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
                  >Create Profile</Button>
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

export default FormsProfileChangeModal
