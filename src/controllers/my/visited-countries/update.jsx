import nc from '@/controllers/_helpers/nc'
import * as yup from 'yup'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import parseData from '@/controllers/_middlewares/parseData'

const updateSchema = yup.object({
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
  rating: yup.number().integer().required(),
  tips: yup.array().of(
    yup.object({
      state: yup.string().required(),
      city: yup.string().required(),
      content: yup.string().required()
    })
  )
  // .default(undefined)
})

const controllersMyVisitedCountriesUpdate = async (req, res) => {
  try {
    const { query: { visitedCountryId }, body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const updatedVisitedCountry = await prisma.visitedCountry.update({
      where: { id: Number(visitedCountryId) },
      data: {
        ...verifiedData,
        tips: {
          deleteMany: {},
          create: verifiedData?.tips
        }
      },
      include: { tips: true }
    })
    return res.status(200).json(updatedVisitedCountry)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(parseData)
  .use(authenticateUser)
  .use(controllersMyVisitedCountriesUpdate)
