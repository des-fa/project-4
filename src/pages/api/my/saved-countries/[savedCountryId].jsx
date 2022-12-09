import nc from '@/controllers/_helpers/nc'
import controllersMySavedCountriesDestroy from '@/controllers/my/saved-countries/destroy'

export default nc()
  .delete(controllersMySavedCountriesDestroy)
