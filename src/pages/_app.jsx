import '@/styles/globals.scss'
import { ToastContainer } from 'react-toastify'
import { appWithTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import appWithSession from '@/hoc/appWithSession'

function MyApp({ Component, pageProps }) {
  const { status, data: user } = useSession()
  const { pathname, push } = useRouter()

  if (status === 'authenticated' && !user.role && !pathname.includes('/my/profile/create')) {
    push('/my/profile/create')
    return null
  }

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default appWithSession(appWithTranslation(MyApp))
