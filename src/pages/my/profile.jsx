import withAuth from '@/hoc/withAuth'
import useMyProfile from '@/hooks/profile'

export function Profile() {
  const { myProfile, isLoading, isError, errorMessage, createMyProfile, updateMyProfile } = useMyProfile()
  if (isLoading) return <div>Loading...</div>
  if (!myProfile) {
    return (
      <div>
        <h1>hello</h1>
        <button type="button" onClick={createMyProfile}>Create</button>

      </div>
    )
  }
  if (isError) {
    return <div>{errorMessage}</div>
  }

  return (
    <div>
      <h1>Profile</h1>
      {myProfile.fullName}
      {myProfile.about}
      <img src={myProfile.avatar} alt="profile-picture" className="w-25" />
      <button type="button" onClick={updateMyProfile}>Update</button>
    </div>
  )
}

export default withAuth(Profile)
