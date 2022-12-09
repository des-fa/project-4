import nc from '@/controllers/_helpers/nc'
import controllersMyFollowingCreate from '@/controllers/my/following/create'
import controllersMyFollowingDestroy from '@/controllers/my/following/destroy'

export default nc()
  .post(controllersMyFollowingCreate)
  .delete(controllersMyFollowingDestroy)
