import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersMySavedCountriesDestroy = async (req, res) => {
  try {
    const { query: { savedCountryId } } = req
    const deletedSavedCountry = await prisma.savedCountry.delete({
      where: { id: Number(savedCountryId) }
    })
    return res.status(200).json(deletedSavedCountry)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMySavedCountriesDestroy)
