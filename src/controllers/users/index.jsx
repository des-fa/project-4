import nc from '@/controllers/_helpers/nc'
import prisma from '@/controllers/_helpers/prisma'
import handleErrors from '@/controllers/_helpers/handleErrors'
import authenticateUser from '@/controllers/_middlewares/authenticateUser'
import { getSession } from 'next-auth/react'

const controllersUsersIndex = async (req, res) => {
  try {
    const session = await getSession({ req })

    // Filters
    const q = req.query.q || ''
    // Search by name, visited countries, travel plans

    // Pagination
    const take = 5
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      NOT: {
        id: {
          equals: session.user.id
        }
      },
      OR: [
        {
          id: {
            contains: q,
            mode: 'insensitive'
          }
        },
        {
          profile: {
            fullName: {
              contains: q,
              mode: 'insensitive'
            }

          }
        }, {
          visitedCountries: {
            some: {
              iso2: {
                contains: q,
                mode: 'insensitive'
              }
            }
          }
        }, {
          travelPlans: {
            some: {
              iso2: {
                contains: q,
                mode: 'insensitive'
              },
              isPublic: true
            }
          }
        }
      ]
    }

    const totalUsers = await prisma.user.count({ where })
    const foundUsers = await prisma.user.findMany({
      take,
      skip,
      where,
      orderBy: {
        id: 'asc'
      },
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: {
            fullName: true,
            avatar: true
          }
        }
      }
    })

    return res.status(200).json({
      users: foundUsers,
      meta: { currentPage: page, totalPages: Math.ceil(totalUsers / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default nc()
  .use(authenticateUser)
  .use(controllersUsersIndex)
