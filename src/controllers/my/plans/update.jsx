import nc from '@/controllers/_helpers/nc'
import * as yup from 'yup'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

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
  isPublic: yup.boolean().transform((value) => (!!value))
})

const controllersMyPlansUpdate = async (req, res) => {
  try {
    const { query: { planId }, body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    const updatedPlan = await prisma.travelPlan.update({
      where: { id: Number(planId) },
      data: {
        ...verifiedData
      }
    })
    return res.status(200).json(updatedPlan)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyPlansUpdate)
