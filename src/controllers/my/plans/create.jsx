import nc from '@/controllers/_helpers/nc'
import * as yup from 'yup'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const createSchema = yup.object({
  iso2: yup.string().uppercase().required(),
  countryName: yup.string().required(),
  month: yup
    .number()
    .integer()
    .min(1, 'This month does not exist')
    .max(12, 'This month does not exist')
    // .test('len', 'Must be exactly 2 numbers', (val) => val && val.toString().length === 2)
    .required(),
  year: yup
    .number()
    .integer()
    .test('len', 'Must be exactly 4 numbers', (val) => !val || val.toString().length === 4)
    .required(),
  isPublic: yup.boolean().transform((value) => (!!value))
})

const controllersMyPlansCreate = async (req, res) => {
  try {
    const session = await getSession({ req })
    // console.log(session?.user)

    const { body } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const newPlan = await prisma.travelPlan.create({
      data: {
        ...verifiedData,
        user: {
          connect: {
            id: session?.user?.id
          }
        }
      }
    })
    return res.status(201).json(newPlan)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyPlansCreate)
