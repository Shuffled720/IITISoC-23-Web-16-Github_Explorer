import { useState } from "react"

export default function search(){

const[searchdata,setSearchdata]=useState([])
const[repos,setRepos]=useState([])

const handleSubmit = async (e)=>{
    e.preventDefault()
    const sdata = {
        search: e.target.search.value
      }
    // console.log(sdata.search)
    const fetchSearch = ()=>{
        fetch(`https://api.github.com/search/users?q=${sdata.search}&per_page=20`)
        .then(response=>{
         return response.json()
        })
        .then(data =>{
            setSearchdata(data.items)
        })
        // console.log(searchdata)
    }
    fetchSearch()
}

const handleSubmitrepo = async (e)=>{
    e.preventDefault()
    const rdata = {
        searchrepo: e.target.searchrepo.value
      }
    //   console.log(rdata)
      const fetchrepoSearch = ()=>{
        fetch(`https://api.github.com/search/repositories?q=${rdata.searchrepo}&sort=stargazers_count&per_page=20`)
        .then(response=>{
         return response.json()
        })
        .then(data =>{
            setRepos(data.items)
        })
        console.log(repos)
    }
    fetchrepoSearch()
    }



    return(
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="search">user name</label>
            <input type="text" id="search" name="search" required />
            <button type="submit">Submit</button>
        </form>
        <div>
        {searchdata.length>0 &&(
            <ul>
                {searchdata.map(searchd=>(
                    <li key={searchd.id}>{searchd.login}</li>
                ))}
            </ul>
        )}
    </div>

    <form onSubmit={handleSubmitrepo}>
            <label htmlFor="searchrepo">repo name</label>
            <input type="text" id="searchrepo" name="searchrepo" required />
            <button type="submit">Submit</button>
        </form>
        <div>
        {repos.length>0 &&(
            <ul>
                {repos.map(repo=>(
                    <li key={repo.id}>{repo.name} <br /> fullname:  {repo.full_name}</li>
                ))}
            </ul>
        )}
    </div>
        </>
        
    )
}