import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersMyPlansDestroy = async (req, res) => {
  try {
    const { query: { planId } } = req
    const deletedPlan = await prisma.travelPlan.delete({
      where: { id: Number(planId) }
    })
    return res.status(200).json(deletedPlan)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyPlansDestroy)
