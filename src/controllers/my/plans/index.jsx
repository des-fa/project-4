import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const controllersMyPlansIndex = async (req, res) => {
  try {
    const session = await getSession({ req })

    // Pagination
    const take = 5
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      userId: session.user.id
    }

    const totalMyPlans = await prisma.travelPlan.count({ where })
    const foundMyPlans = await prisma.travelPlan.findMany({
      take,
      skip,
      where,
      // orderBy: {
      //   year: 'desc'
      // }
      orderBy: [
        {
          year: 'desc'
        },
        {
          month: 'desc'
        },
        {
          createdAt: 'desc'
        }
      ]
    })

    return res.status(200).json({
      plans: foundMyPlans,
      meta: { currentPage: page, totalPages: Math.ceil(totalMyPlans / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyPlansIndex)
