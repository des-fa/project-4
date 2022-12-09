import nc from '@/controllers/_helpers/nc'
import * as yup from 'yup'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import { getSession } from 'next-auth/react'
import uploadFileAsync from '@/controllers/_helpers/uploadFile'
import parseData from '@/controllers/_middlewares/parseData'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const updateSchema = yup.object({
  fullName: yup.string()
    .matches(/.{5,15}/, {
      excludeEmptyString: true,
      message: 'Must be between 5 to 15 characters'
    }),
  about: yup.string(),
  avatar: yup.mixed()
})

const controllersMyProfileUpdate = async (req, res) => {
  try {
    const session = await getSession({ req })

    const { body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)

    const dataToSave = {
    }

    if (verifiedData.fullName) {
      dataToSave.fullName = verifiedData.fullName
    }

    if (verifiedData.about) {
      dataToSave.about = verifiedData.about
    }

    if (verifiedData.avatar) {
      dataToSave.avatar = verifiedData.avatar
    }

    const updatedProfile = await prisma.profile.update({
      where: { userId: session.user.id },
      data: {
        ...dataToSave
      }
    })
    return res.status(200).json(updatedProfile)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(parseData)
  .use(authenticateUser)
  .use(controllersMyProfileUpdate)
