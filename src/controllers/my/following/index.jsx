import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const controllersMyFollowingIndex = async (req, res) => {
  try {
    const session = await getSession({ req })

    // Pagination
    const take = 5
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      followerId: session.user.id
    }

    const totalMyFollowing = await prisma.follows.count({ where })
    const foundMyFollowing = await prisma.follows.findMany({
      take,
      skip,
      where,
      orderBy: {
        followingId: 'asc'
      },
      include: {
        following: {
          select: {
            id: true,
            profile: {
              select: {
                fullName: true,
                avatar: true
              }
            }
          }
        }
      }
    })

    return res.status(200).json({
      following: foundMyFollowing,
      meta: { currentPage: page, totalPages: Math.ceil(totalMyFollowing / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyFollowingIndex)
