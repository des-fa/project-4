import SSRProvider from 'react-bootstrap/SSRProvider'
import Head from 'next/head'
// import { useRouter } from 'next/router'
// import { useSession } from 'next-auth/react'

import '@/styles/globals.scss'
import ScrollToTop from 'react-scroll-to-top'
import { ToastContainer } from 'react-toastify'
import { appWithTranslation } from 'next-i18next'
import NavBar from '@/components-layouts/Navbar'

// import useMyUser from '@/hooks/my/user'
import appWithSession from '@/hoc/appWithSession'

function MyApp({ Component, pageProps }) {
  // const { status } = useSession()
  // const { myUser } = useMyUser()
  // const { pathname, push } = useRouter()

  // let profile = {}
  // if (myUser) {
  //   profile = myUser?.profile
  // }
  // if (status === 'authenticated' && Object.keys(profile).length === 0 && !pathname.includes('/my/profile')) {
  //   push('/my/profile')
  //   return null
  // }

  return (
    <SSRProvider>
      <Head>
        <title>At Your Fingertips</title>
      </Head>
      <NavBar />
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
      <ScrollToTop smooth className="scroll-btn" style={{ right: 20, bottom: 30 }} />
    </SSRProvider>
  )
}

export default appWithSession(appWithTranslation(MyApp))
