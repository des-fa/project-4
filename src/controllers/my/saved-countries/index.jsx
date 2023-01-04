import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const controllersMySavedCountriesIndex = async (req, res) => {
  try {
    const session = await getSession({ req })

    // Pagination
    const take = 10
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      userId: session.user.id
    }

    const totalMySavedCountries = await prisma.savedCountry.count({ where })
    const foundMySavedCountries = await prisma.savedCountry.findMany({
      take,
      skip,
      where,
      orderBy: {
        iso2: 'asc'
      }
    })

    return res.status(200).json({
      savedCountries: foundMySavedCountries,
      meta: { currentPage: page, totalPages: Math.ceil(totalMySavedCountries / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersMySavedCountriesIndex)
