import nc from '@/controllers/_helpers/nc'
import * as yup from 'yup'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const updateSchema = yup.object({
  fullName: yup.string()
    .min(2, 'Minimum 2 characters')
    .max(15, 'Maximum 15 characters')
    .required(),
  about: yup.string().required(),
  avatar: yup.mixed().required()
})

const controllersMyProfileUpdate = async (req, res) => {
  try {
    const session = await getSession({ req })

    const { body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const updatedProfile = await prisma.profile.update({
      where: { userId: session.user.id },
      data: {
        ...verifiedData
      }
    })
    return res.status(200).json(updatedProfile)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyProfileUpdate)
