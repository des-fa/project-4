import nc from '@/controllers/_helpers/nc'
import controllersMyVisitedCountriesShow from '@/controllers/my/visited-countries/show'
import controllersMyVisitedCountriesUpdate from '@/controllers/my/visited-countries/update'
import controllersMyVisitedCountriesDestroy from '@/controllers/my/visited-countries/destroy'

export default nc()
  .get(controllersMyVisitedCountriesShow)
  .put(controllersMyVisitedCountriesUpdate)
  .delete(controllersMyVisitedCountriesDestroy)

export const config = {
  api: {
    bodyParser: false
  }
}
