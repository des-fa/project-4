import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersMyVisitedCountriesDestroy = async (req, res) => {
  try {
    const { query: { visitedCountryId } } = req
    const deletedVisitedCountry = await prisma.visitedCountry.delete({
      where: { id: Number(visitedCountryId) },
      include: { tips: true }
    })
    return res.status(200).json(deletedVisitedCountry)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyVisitedCountriesDestroy)
