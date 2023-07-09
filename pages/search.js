import { useState } from "react"
import Style from '../styles/search.module.css'
export default function search(){

const[searchdata,setSearchdata]=useState([])
const[repos,setRepos]=useState([])
const [commitinfo, setCommitinfo] = useState({})
const [githubUserData, setGithubUserData] = useState({})
const [sort,setSort]=useState()

const None = 'None'

const handleUsersubmit = (e)=>{
    fetch(`https://api.github.com/users/${e.target.value}`)
    .then(response=>{
        return response.json()
    })
    .then(data =>{
        setGithubUserData({[e.target.value]: data})
    })
}

const handleStarSort = ()=>{
    setSort('stars')

}
const handleClearSort =()=>{
    setSort()

}
const handleforkSort = ()=>{
    setSort('forks')

}

const handleReposubmit = async(e)=>{
        const commitResponse = await fetch(
            `https://api.github.com/repos/${e.target.value}/commits` )
            .then(response=>{
              return response.json()
          })
          .then(data =>{
              setCommitinfo({[e.target.value]: data})
          })
}

const handleStartClick = (e)  => {
    e.preventDefault()
    window.location.href = "/"
  }

const handleSubmit = async (e)=>{
    e.preventDefault()
    const sdata = {
        search: e.target.search.value
      }

    const fetchSearch = ()=>{
        fetch(`https://api.github.com/search/users?q=${sdata.search}&per_page=20`)
        .then(response=>{
         return response.json()
        })
        .then(data =>{
            setSearchdata(data.items)
        })
       
    }
    fetchSearch()
  
}

const handleSubmitrepo = async (e)=>{
    e.preventDefault()
    const rdata = {
        searchrepo: e.target.searchrepo.value,
        langrepo: e.target.langrepo.value
        
      }
     
      const fetchrepoSearch = ()=>{
        if(rdata.langrepo){
            console.log(rdata.langrepo)
            fetch(`https://api.github.com/search/repositories?q=${rdata.searchrepo}+language:${rdata.langrepo}&sort=${sort}&per_page=20`)
            .then(response=>{
             return response.json()
            })
            .then(data =>{
                setRepos(data.items)
            })
          }
          else{
            console.log(rdata.searchrepo)
            fetch(`https://api.github.com/search/repositories?q=${rdata.searchrepo}&sort=${sort}&per_page=20`)
            .then(response=>{
             return response.json()
            })
            .then(data =>{
                setRepos(data.items)
            })
          }
    
       
    }
    fetchrepoSearch()
    }




    return(
        <>
        <div className={Style.search}>
        <div>
        <button onClick={handleStartClick}>Home</button>
      </div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">user name</label>
            <input type="text" id="search" name="search" required placeholder="user name"/>
            <button type="submit">Submit</button>
        </form>
        <div>
        {searchdata.length>0 &&(
            <ul>
                {searchdata.map(searchd=>(
                    <>
                    
                    <li key={searchd.id}>

                  
                    <button type="submit" onClick={handleUsersubmit} value={searchd.login}>{searchd.login}</button>
                    </li>

                    {!!githubUserData[searchd.login]?.followers && `Followers:${githubUserData[searchd.login]?.followers}  ,`}
                    {!!githubUserData[searchd.login]?.following && ` Following:${githubUserData[searchd.login]?.following}  ,`}
                    {!!githubUserData[searchd.login]?.public_repos && ` public repos:${githubUserData[searchd.login]?.public_repos}  `}
                    {!!githubUserData[searchd.login]?.html_url &&( 
                        <a href={githubUserData[searchd.login]?.html_url} className={Style.url} target="blank" >URL</a>)}

                    </>
                    
                ))}
            </ul>
        )}
    </div>

    <form onSubmit={handleSubmitrepo}>
            <label htmlFor="searchrepo" >repo name</label>
            <input type="text" id="searchrepo" name="searchrepo" required placeholder="repository" />
            <input type="text" id="langrepo" name="langrepo" placeholder="Language" />
            <button type="submit">Submit</button>
            <li className={Style.sortcond} >sorting condition: {sort?sort:None}</li>
        </form>
       <button type="submit" onClick={handleStarSort}>Sort by stars</button>
       <button type="submit" onClick={handleforkSort}>Sort by forks</button>
       <button type="submit" onClick={handleClearSort}>clear filters</button>
        <div>
        {repos.length>0 &&(
            <ul>
                {repos.map(repo=>(
                    <>
                    <div className={Style.repobox}>
                    <a className={Style.repo_name} href={repo.html_url} target="blank">{repo.full_name}</a>
                    {/* <li key={repo.id}>{repo.name} <br /> fullname:  {repo.full_name}</li> */}
                    {/* <li >{repo.id}</li> */}
                    <li>stars: {repo.stargazers_count}</li>
                    <li>Language: {repo.language}</li>
                    <li>Forks: {repo.forks_count}</li>
                    {/* <a href={repo.html_url} target="blank">link</a> */}
                    <button type="submit" onClick={handleReposubmit} value={repo.full_name}>Repo details</button>
                    </div>
                    <ul>
                        {commitinfo[repo.full_name] && commitinfo[repo.full_name].slice(0,5).map(ele => {
                        
                            
                           return ( 
                           <>
                           <li><b>Commited by: </b>{ele.commit.author.name}</li>
                           <li> <b>Commit message:</b> {ele.commit.message}</li>
                           <li> <b>Commit date:</b> {ele.commit.author.date.split("T")[0]}</li>
                           <li> <b>Commit time:</b> {ele.commit.author.date.split("T")[1].split("Z")[0]} GMT</li>
                           <br />
                           </>
                           )
                        })}
                        </ul>
                    </>
                ))}
            </ul>
        )}
    </div>
        </div>
        
        </>
        
    )
}