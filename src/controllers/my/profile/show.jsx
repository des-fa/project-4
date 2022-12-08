import nc from '@/controllers/_helpers/nc'
// import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const controllersMyProfileShow = async (req, res) => {
  try {
    const session = getSession({ req })
    console.log(session)

    // const foundProfile = await prisma.profile.findUnique({
    //   where: {
    //     userId
    //   },
    //   rejectOnNotFound: true })
    // return res.status(200).json(foundProfile)
    return session
  } catch (err) {
    return handleErrors(res, err)
  }

  // const { query: { todoId } } = req
  // const foundTodo = await getTodoWithId(todoId)
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyProfileShow)
