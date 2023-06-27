import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Style from '../styles/login.module.css'
// REMEMBER TO CHANGE CALLBACK URL

const handleSearchClick = (e)  => {
    e.preventDefault()
    window.location.href = "/search"
  }


const handlesignout = (e)  => {
    e.preventDefault()
    signOut({ callbackUrl: 'http://localhost:3000' });
  }

export default function Home() {


    const handlesubmit = async(e)=>{
        const commitResponse = await fetch(
            `https://api.github.com/repos/${e.target.value}/commits` )
            .then(response=>{
              return response.json()
          })
          .then(data =>{
              setCommitinfo({[e.target.value]: data})
          })
       
            
    }

  const { data: session, status } = useSession();
  const [githubUserData, setGithubUserData] = useState()
  const [repoinfo, setRepoinfo]= useState([])
  const [commitinfo, setCommitinfo] = useState({})
  const [follower, setFollower] = useState({})
  const [following, setFollowing] = useState({})

  

  useEffect(() => {
    if (session) {
      loadUserInfo();
    }
  }, [session]);


  const loadUserInfo = async () => {
    try {

      const userId = session.user.image.split("/u/")[1].split("?")[0]

        
      const userResponse = await fetch(`https://api.github.com/user/${userId}`,
      );
      const userData = await userResponse.json();
   
      setGithubUserData(userData)

      const fetchfollow = ()=>{
        fetch( `https://api.github.com/user/${userId}/followers` )
        .then(response=>{
            return response.json()
        })
        .then(data =>{
            setFollower({[userId]: data})
        })
      
      }
      fetchfollow()


      const fetchfollowing = ()=>{
        fetch( `https://api.github.com/user/${userId}/following` )
        .then(response=>{
            return response.json()
        })
        .then(data =>{
            setFollowing({[userId]: data})
        })
    
      }
      fetchfollowing()
     
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




      if (repoinfo.length > 0) {
      
        const commitResponse = await fetch(
          `https://api.github.com/repos/${repoinfo[0].full_name}/commits` )
          .then(response=>{
            return response.json()
        })
        .then(data =>{
            setCommitinfo(data)
        })
    //     const commitData = await commitResponse.json();
       
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <div className={Style.login}>
      {!session && (
        <>
        <div className={Style.notsession}>
          <p>Please sign in to view user information and repositories.</p>
          <button className={Style.loginbtn} onClick={() => signIn('github')}>Sign-In</button>
          </div>
        </>
      )}

      {session && (
        <>
        <div className={Style.lgnpg}>

      
          <p>Welcome, {session.user.name}!</p>
          <button onClick={handlesignout}>Sign out</button>
          <div>
        <button onClick={handleSearchClick}>explore</button>
         </div>
          <img className={Style.profimg} src={session.user.image} alt="Profile" />
            <div className={Style.data}>
            {githubUserData?.login}
            {githubUserData?.bio}
            followers:{githubUserData?.followers}
            following:{githubUserData?.following}
            public repos: {githubUserData?.public_repos}
            </div>
            
            <div className={Style.follower}>
                followers:
                <ol>
                    {follower[githubUserData?.id]&& follower[githubUserData?.id].map(ele=>{
                       
                        return(
                            <li>{ele?.login}</li>
                        )
                    })}
                </ol>
            </div>
            <div className={Style.following}>
                following:
                <ol>
                    {following[githubUserData?.id]&& following[githubUserData?.id].map(ele=>{
                       
                        return(
                            <li>{ele?.login}</li>
                        )
                    })}
                </ol>
            </div>
        <div className={Style.repo}>
            {repoinfo.length>0 &&(
                <ul>
                    {repoinfo.map(repo=>(
                        <>
                        <li key={repo.id}>{repo.name}</li>
                        <button type="submit" onClick={handlesubmit} value={repo.full_name}>search</button>
                        <ol>
                        {commitinfo[repo.full_name] && commitinfo[repo.full_name].map(ele => {
                         
                            
                           return ( 
                           <>
                           <li> {ele.commit.author.name}</li>
                           <li> {ele.commit.message}</li>
                           <li> {ele.commit.author.date.split("T")[0]}</li>
                           <li> {ele.commit.author.date.split("T")[1].split("Z")[0]} GMT</li>
                           </>
                           )
                        })}
                        </ol>
                        </>
                    ))}
                </ul>
            )}
        </div>
        </div>
        </>
      )}
    </div>
  );
}
