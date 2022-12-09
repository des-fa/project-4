import nc from '@/controllers/_helpers/nc'
import * as yup from 'yup'
import prisma from '@/controllers/_helpers/prisma'
import uploadFileAsync from '@/controllers/_helpers/uploadFile'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'
import parseData from '@/controllers/_middlewares/parseData'

const createSchema = yup.object({
  fullName: yup.string()
    .matches(/.{5,15}/, {
      excludeEmptyString: true,
      message: 'Must be between 5 to 15 characters'
    })
    .required(),
  about: yup.string().required(),
  avatar: yup.mixed().required()
})

const controllersMyProfileCreate = async (req, res) => {
  try {
    const session = await getSession({ req })

    const { body } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })

    await uploadFileAsync(verifiedData, req)

    const dataToSave = {
      fullName: verifiedData.fullName,
      about: verifiedData.about,
      avatar: verifiedData.avatar
    }

    const newProfile = await prisma.profile.create({
      data: {
        ...dataToSave,
        user: {
          connect: {
            id: session.user.id
          }
        }
      },
      include: {
        user: true
      }
    })

    return res.status(201).json(newProfile)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(parseData)
  .use(authenticateUser)
  .use(controllersMyProfileCreate)
