/* eslint-disable react/prop-types */
export default async function UserProfile({ params }) {
  const { id } = await params;

  return (
    <>
      <h1>Udało ci się zalogować!</h1>
      <p>Twoje ID: {id}</p>
    </>
  );
}
