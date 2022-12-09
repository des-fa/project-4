import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'

const controllersMyVisitedCountriesShow = async (req, res) => {
  try {
    const { query: { visitedCountryId } } = req
    const foundVisitedCountry = await prisma.visitedCountry.findUnique({
      where: {
        id: Number(visitedCountryId)
      },
      include: {
        tips: true
      },
      rejectOnNotFound: true
    })
    return res.status(200).json(foundVisitedCountry)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMyVisitedCountriesShow)
