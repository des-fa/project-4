// // import { useEffect, useRef, useState } from 'react'
// // import firebase from 'firebase/app'
// import { ref, set } from 'firebase/database'
// import 'firebase/firestore'
// import moment from 'moment'
// // import { formatRelative } from 'date-fns'

// export default function ChatRoom(props) {
//   const { db } = props
//   const uid = props?.myUser?.id
//   const displayName = props?.myUser?.profile?.fullName
//   const avatar = props?.myUser?.profile?.avatar

//   // const dummySpace = useRef()

//   // const [newMessage, setNewMessage] = useState('')
//   // const [messages, setMessages] = useState([])

//   // useEffect(() => {
//   //   db.collection('messages')
//   //     .orderBy('createdAt')
//   //     .limit(100)
//   //     .onSnapshot((querySnapShot) => {
//   //       const data = querySnapShot.docs.map((doc) => ({
//   //         ...doc.data(),
//   //         id: doc.id
//   //       }))

//   //       setMessages(data)
//   //     })
//   // }, [db])

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     const d = new Date()
//     const timestamp = moment(d).format('MMMM Do YYYY, h:mm:ss a')

//     set(ref(db, 'messages'), {
//       text: newMessage,
//       createdAt: timestamp,
//       uid,
//       displayName,
//       avatar
//     })

//     setNewMessage('')

//     // scroll down the chat
//     dummySpace.current.scrollIntoView({ behavor: 'smooth' })
//   }

//   return (
//     <main id="chat_room">

//       <ul>
//         {messages.map((message) => (
//           <li key={message.id} className={message.uid === uid ? 'sent' : 'received'}>
//             <section>
//               {/* display user image */}
//               {message.avatar ? (
//                 <imImg
//                   src={message.avatar}
//                   alt="Avatar"
//                   width={45}
//                   height={45}
//                 />
//               ) : null}
//             </section>

//             <section>
//               {/* display message text */}
//               <p>{message.text}</p>

//               {/* display user name */}
//               {message.displayName ? <span>{message.displayName}</span> : null}
//               <br />
//               {/* display message date and time */}
//               {message.createdAt?.seconds ? (
//                 <span>
//                   {/* {formatRelative( */}
//                   new Date(message.createdAt.seconds * 1000),
//                   new Date()
//                   )}
//                 </span>
//               ) : null}
//             </section>
//           </li>
//         ))}
//       </ul>

//       <section ref={dummySpace} />

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message here..."
//         />

//         <button type="submit" disabled={!newMessage}>
//           Send
//         </button>
//       </form>
//     </main>
//   )
// }
