import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const controllersUsersProfileShow = async (req, res) => {
  try {
    const session = await getSession({ req })
    const { query: { userId } } = req
    const foundProfile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            ...(session.user.id ? {
              followedBy: {
                where: {
                  followerId: session.user.id
                }
              }
            } : {}),
            ...(session.user.id ? {
              following: {
                where: {
                  followingId: session.user.id
                }
              }
            } : {})
          }
        }
      },
      rejectOnNotFound: true })
    return res.status(200).json(foundProfile)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersUsersProfileShow
  )
