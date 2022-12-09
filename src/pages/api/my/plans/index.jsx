import nc from '@/controllers/_helpers/nc'
import controllersMyPlansIndex from '@/controllers/my/plans/index'
import controllersMyPlansCreate from '@/controllers/my/plans/create'

export default nc()
  .get(controllersMyPlansIndex)
  .post(controllersMyPlansCreate)
