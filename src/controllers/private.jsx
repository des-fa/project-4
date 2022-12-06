import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from './_middlewares/authenticateUser'

const controllersPrivate = async (req, res) => {
  try {
    return res.status(200).json({ message: 'This is a private page!' })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersPrivate)
