import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const handlesignout = (e)  => {
    e.preventDefault()
    signOut({ callbackUrl: 'http://localhost:3000' });
  }

export default function Home() {
  const { data: session, status } = useSession();
  const [githubUserData, setGithubUserData] = useState()
  const [repoinfo, setRepoinfo]= useState([])

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
     
     const fetchRepo = ()=>{
        fetch( `https://api.github.com/user/${userId}/repos?` )
        .then(response=>{
            return response.json()
        })
        .then(data =>{
            setRepoinfo(data)
        })
     }
        fetchRepo()





    //   if (repoData.length > 0) {
    //     const commitResponse = await fetch(
    //       `https://api.github.com/repos/${repoData[0].full_name}/commits`
    //     );
    //     const commitData = await commitResponse.json();
    //     console.log('Commit History:', commitData);
    //   }
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
        <div>
            {repoinfo.length>0 &&(
                <ul>
                    {repoinfo.map(repo=>(
                        <li key={repo.id}>{repo.name}</li>
                    ))}
                </ul>
            )}
        </div>

        </>
      )}
    </div>
  );
}
