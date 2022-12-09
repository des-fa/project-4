import nc from '@/controllers/_helpers/nc'
import * as yup from 'yup'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const createSchema = yup.object({
  iso2: yup.string().uppercase().required()
})

const controllersMySavedCountriesCreate = async (req, res) => {
  try {
    const session = await getSession({ req })
    // console.log(session?.user)

    const { body } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const newSavedCountry = await prisma.savedCountry.create({
      data: {
        ...verifiedData,
        user: {
          connect: {
            id: session?.user?.id
          }
        }
      }
    })
    return res.status(201).json(newSavedCountry)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMySavedCountriesCreate)
