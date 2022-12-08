import nc from '@/controllers/_helpers/nc'
import controllersMyProfileShow from '@/controllers/my/profile/show'
// import controllersProfileCreate from '@/controllers/my/profile/create'
// import controllersProfileUpdate from '@/controllers/my/profile/update'

export default nc()
  .get(controllersMyProfileShow)
  // .post(controllersMyProfileCreate)
  // .put(controllersMyProfileUpdate)
