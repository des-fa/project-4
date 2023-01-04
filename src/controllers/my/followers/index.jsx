import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const controllersMyFollowersIndex = async (req, res) => {
  try {
    const session = await getSession({ req })

    // Pagination
    const take = 5
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      followingId: session.user.id
    }

    const totalMyFollowers = await prisma.follows.count({ where })
    const foundMyFollowers = await prisma.follows.findMany({
      take,
      skip,
      where,
      orderBy: {
        // followerId: 'asc'
        follower: {
          profile: {
            fullName: 'asc'
          }
        }
      },
      include: {
        follower: {
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
      followers: foundMyFollowers,
      meta: { currentPage: page, totalPages: Math.ceil(totalMyFollowers / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyFollowersIndex)
