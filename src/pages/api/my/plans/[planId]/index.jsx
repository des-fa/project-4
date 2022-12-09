import nc from '@/controllers/_helpers/nc'
import controllersMyPlansShow from '@/controllers/my/plans/show'
import controllersMyPlansUpdate from '@/controllers/my/plans/update'
import controllersMyPlansDestroy from '@/controllers/my/plans/destroy'

export default nc()
  .get(controllersMyPlansShow)
  .put(controllersMyPlansUpdate)
  .delete(controllersMyPlansDestroy)
