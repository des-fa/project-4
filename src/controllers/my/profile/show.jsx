import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const controllersMyProfileShow = async (req, res) => {
  try {
    const session = await getSession({ req })
    // console.log('show', session?.user?.id)

    const foundProfile = await prisma.profile.findUnique({
      where: {
        userId: session?.user?.id
      },
      rejectOnNotFound: true })
    return res.status(200).json(foundProfile)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyProfileShow)
