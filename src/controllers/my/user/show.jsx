import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

import { getSession } from 'next-auth/react'

const controllersMyUserShow = async (req, res) => {
  try {
    const session = await getSession({ req })

    const foundUser = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      include: {
        profile: true,
        following: true
      },
      rejectOnNotFound: true
    })
    return res.status(200).json(foundUser)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyUserShow)
