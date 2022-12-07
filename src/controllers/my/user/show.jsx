import nc from '@/controllers/_helpers/nc'
import handleErrors from '@/controllers/_helpers/handleErrors'
// import { getTodoWithId } from './_queries'

const controllersMyUserShow = async (req, res) => {
  try {
    const { query: { todoId } } = req
    const foundTodo = await getTodoWithId(todoId)
    return res.status(200).json(foundTodo)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(controllersMyUserShow)
