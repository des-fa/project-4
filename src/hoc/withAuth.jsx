import { useSession } from 'next-auth/react'

export default function withAuth(Component) {
  return (props) => {
    const { status } = useSession({
      required: true,
      unauthorized: '/api/auth/signin'
    })

    if (status === 'loading') return <div><h3 className="text-muted fw-light m-4">Loading...</h3></div>

    return (
      <Component {...props} />
    )
  }
}
