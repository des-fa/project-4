import nc from '@/controllers/_helpers/nc'
import controllersMyVisitedCountriesIndex from '@/controllers/my/visited-countries/index'
import controllersMyVisitedCountriesCreate from '@/controllers/my/visited-countries/create'

export default nc()
  .get(controllersMyVisitedCountriesIndex)
  .post(controllersMyVisitedCountriesCreate)

export const config = {
  api: {
    bodyParser: false
  }
}
