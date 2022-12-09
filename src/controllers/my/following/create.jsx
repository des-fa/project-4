import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const controllersMyFollowingCreate = async (req, res) => {
  try {
    const session = await getSession({ req })

    const { query: { userId } } = req
    // userId=user's profile page you're on HOW TO GET
    // session.user.id=current logged in user

    const newFollowing = await prisma.follows.create({
      data: {
        follower: {
          connect: {
            id: session.user.id
          }
        },
        following: {
          connect: {
            id: Number(userId)
          }
        }
      }
    })
    return res.status(201).json(newFollowing)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyFollowingCreate)
