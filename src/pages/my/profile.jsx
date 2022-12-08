import withAuth from '@/hoc/withAuth'
import useMyProfile from '@/hooks/profile'

export function Profile() {
  const { myProfile, isLoading, isError, errorMessage, createMyProfile, updateMyProfile } = useMyProfile()
  if (isLoading) return <div>Loading...</div>
  if (!myProfile) {
    return (
      <div>
        <h1>hello</h1>
        <button type="button" onClick={() => (console.log('hi'))}>Create</button>

      </div>
    )
  }
  if (isError) {
    return <div>{errorMessage}</div>
  }

  // return (
  //   <div>
  //     <h1>Profile</h1>
  //     {/* {myProfile} */}
  //     {/* <button type="button" onClick={updateMyProfile}>Update</button> */}
  //   </div>
  // )
}

export default withAuth(Profile)
