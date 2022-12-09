import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersMyPlansShow = async (req, res) => {
  try {
    const { query: { planId } } = req
    const foundPlan = await prisma.travelPlan.findUnique({ where: { id: Number(planId) },
      rejectOnNotFound: true })
    return res.status(200).json(foundPlan)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyPlansShow)
