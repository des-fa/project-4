import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const controllersUsersPlansIndex = async (req, res) => {
  try {
    const session = await getSession({ req })
    const { query: { userId } } = req

    // Pagination
    const take = 5
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      userId,
      isPublic: true,
      NOT: {
        userId: session.user.id
      }
    }

    const totalPlans = await prisma.travelPlan.count({ where })
    const foundPlans = await prisma.travelPlan.findMany({
      take,
      skip,
      where,
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
      plans: foundPlans,
      meta: { currentPage: page, totalPages: Math.ceil(totalPlans / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersUsersPlansIndex)
