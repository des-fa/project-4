import { getCsrfToken, getProviders, signIn, getSession } from 'next-auth/react'

export default function SignIn({ csrfToken, providers }) {
  return (
    <div
      className="d-flex flex-row align-items-center justify-content-center bg-black text-white"
      style={{
        minWidth: '100vh',
        minHeight: '100vh'
      }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center gap-3 border rounded p-5">
        <h1 className="fw-light">Sign up or Log in</h1>

        <form method="post" action="/api/auth/signin/email">
          <div className="d-flex flex-column">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

            <label className="form-label" htmlFor="email">Email address</label>
            <input type="email" id="email" name="email" className="form-control" required />
            <button type="submit" className="btn btn-outline-light mt-3 fw-light">Log in with Email</button>
          </div>
        </form>

        <div className="border-white border-bottom h-25 w-100 my-3" />

        {Object.values(providers).map((provider) => {
          if (provider.name === 'Email') {
            return (null)
          }
          return (
            <div key={provider.name}>
              <button
                type="button"
                className="btn btn-secondary p-2 px-3 fw-light"
                onClick={() => signIn(provider.id)}
              >
                Log in with {provider.name}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: { destination: '/home' }
    }
  }

  const csrfToken = await getCsrfToken(context)
  const providers = await getProviders()

  return {
    props: { csrfToken, providers }
  }
}
