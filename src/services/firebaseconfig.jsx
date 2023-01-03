import { getApp, getApps, initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
// import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC5y40XKrHXwPW9jy0TwYiWqtjySUq0C14',
  authDomain: 'des-bootcamp-project-4.firebaseapp.com',
  databaseURL: 'https://des-bootcamp-project-4-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'des-bootcamp-project-4',
  storageBucket: 'des-bootcamp-project-4.appspot.com',
  messagingSenderId: '700665823471',
  appId: '1:700665823471:web:61b72c66b2f46891f35b1a'
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
// const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
// const db = getFirestore(app)

export default app
export { database }

// console.log(process.env.NEXT_PUBLIC_API_KEY)
// console.log(process.env.NEXT_PUBLIC_AUTH_DOMAIN)
// console.log(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL)
// console.log(process.env.NEXT_PUBLIC_PROJECT_ID)
// console.log(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
// console.log(process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID)
// console.log(process.env.NEXT_PUBLIC_APP_ID)
