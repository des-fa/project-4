import nc from '@/controllers/_helpers/nc'
import controllersMySavedCountriesIndex from '@/controllers/my/saved-countries/index'
import controllersMySavedCountriesCreate from '@/controllers/my/saved-countries/create'

export default nc()
  .get(controllersMySavedCountriesIndex)
  .post(controllersMySavedCountriesCreate)
