import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const handlesignout = (e)  => {
    e.preventDefault()
    signOut({ callbackUrl: 'http://localhost:3000' });
  }

export default function Home() {
  const { data: session, status } = useSession();
  const [githubUserData, setGithubUserData] = useState()

  useEffect(() => {
    if (session) {
      // Fetch and display user info, repositories, and commit history
      loadUserInfo();
    }
  }, [session]);


  const loadUserInfo = async () => {
    try {

      const userId = session.user.image.split("/u/")[1].split("?")[0]
      console.log(userId)

      const userResponse = await fetch(`https://api.github.com/user/${userId}`,
      );
      const userData = await userResponse.json();
      console.log('User Info:', userData);
      setGithubUserData(userData)
     
     
     
     
     
     
     const repoResponse = await fetch(
        `https://api.github.com/user/${userId}/repos?per_page=5`
      );
      const repoData = await repoResponse.json();
      console.log('User Repositories:', repoData);

      if (repoData.length > 0) {
        const commitResponse = await fetch(
          `https://api.github.com/repos/${repoData[0].full_name}/commits`
        );
        const commitData = await commitResponse.json();
        console.log('Commit History:', commitData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <div>
      {!session && (
        <>
          <p>Please sign in to view user information and repositories.</p>
          <button onClick={() => signIn('github')}>Sign in</button>
        </>
      )}

      {session && (
        <>
          <p>Welcome, {session.user.name}!</p>
          <button onClick={handlesignout}>Sign out</button>
          <img src={session.user.image} alt="Profile" />
            {githubUserData?.login}
            {githubUserData?.bio}

        </>
      )}
    </div>
  );
}
