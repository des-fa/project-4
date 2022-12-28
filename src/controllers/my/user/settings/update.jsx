import nc from '@/controllers/_helpers/nc'
import * as yup from 'yup'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import { getSession } from 'next-auth/react'
import parseData from '@/controllers/_middlewares/parseData'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const updateSchema = yup.object({
  email: yup.string().email().test({
    message: () => 'Email already exists',
    test: async (value) => {
      try {
        await prisma.user.findUnique({ where: { email: value }, rejectOnNotFound: true })
        return false
      } catch (err) {
        return true
      }
    }
  })
})

const controllersMyUserSettingsUpdate = async (req, res) => {
  try {
    const session = await getSession({ req })

    const { body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })

    const dataToSave = {
    }

    if (verifiedData.email) {
      dataToSave.email = verifiedData.email
    }

    const foundUser = await prisma.user.update({
      where: { id: session.user.id },
      data: dataToSave
    })
    return res.status(200).json(foundUser)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(parseData)
  .use(authenticateUser)
  .use(controllersMyUserSettingsUpdate)
