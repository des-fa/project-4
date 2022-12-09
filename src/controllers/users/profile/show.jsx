import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersUsersProfileShow = async (req, res) => {
  try {
    const { query: { userId } } = req
    const foundProfile = await prisma.profile.findUnique({ where: { userId },
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
