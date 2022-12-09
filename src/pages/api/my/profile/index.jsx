import nc from '@/controllers/_helpers/nc'
import controllersMyProfileShow from '@/controllers/my/profile/show'
import controllersMyProfileCreate from '@/controllers/my/profile/create'
import controllersMyProfileUpdate from '@/controllers/my/profile/update'

export default nc()
  .get(controllersMyProfileShow)
  .post(controllersMyProfileCreate)
  .put(controllersMyProfileUpdate)

export const config = {
  api: {
    bodyParser: false
  }
}
