import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const controllersCountriesReviewsIndex = async (req, res) => {
  try {
    const session = await getSession({ req })
    const { query: { countryId } } = req
    // console.log(countryId)

    // Filters
    const q = req.query.q || ''
    // console.log('query', req.query)

    // Pagination
    const take = 5
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    let where = {}

    if (q.length >= 1) {
      where = {
        iso2: countryId.toUpperCase(),
        tips: {
          some: {
            city: {
              contains: q,
              mode: 'insensitive'
            }
          }
        },
        NOT: {
          userId: session.user.id
        }
      }
    } else {
      where = {
        iso2: countryId.toUpperCase(),
        NOT: {
          userId: session.user.id
        }
      }
    }

    const totalReviews = await prisma.visitedCountry.count({ where })
    const foundReviews = await prisma.visitedCountry.findMany({
      take,
      skip,
      where,
      orderBy: [
        {
          year: 'desc'
        },
        {
          month: 'desc'
        },
        {
          createdAt: 'desc'
        }
      ],
      include: {
        tips: true,
        user: {
          select: {
            profile: true
          }
        }
      }
    })

    return res.status(200).json({
      reviews: foundReviews,
      meta: { currentPage: page, totalPages: Math.ceil(totalReviews / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersCountriesReviewsIndex)
