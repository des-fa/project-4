import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const controllersMyFollowingDestroy = async (req, res) => {
  try {
    const session = await getSession({ req })

    const { query: { followingId } } = req
    // userId=user's profile page you're on
    // session.user.id=current logged in user

    const deletedFollowing = await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId
        }
      },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
    return res.status(200).json(deletedFollowing)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyFollowingDestroy)
