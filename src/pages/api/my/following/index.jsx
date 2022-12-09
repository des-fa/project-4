import nc from '@/controllers/_helpers/nc'
import controllersMyFollowingIndex from '@/controllers/my/following/index'
import controllersMyFollowingCreate from '@/controllers/my/following/create'

export default nc()
  .get(controllersMyFollowingIndex)
  .post(controllersMyFollowingCreate)
