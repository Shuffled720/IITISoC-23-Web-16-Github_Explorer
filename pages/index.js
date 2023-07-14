import React from 'react'
import Style from '../styles/index.module.css'


const Home = () => {
  return (
    
    <div className={Style.homePg}>
      <div className={Style.cat}>
      <img className={Style.blackcat}  src='/Screenshot 2023-06-11 150834_preview_rev_1.png' />
      </div>
      <div className={Style.para}>
        <p >
        Explore <span style={{color:"#A089E0"}}>GitHub</span><br/>
              Like Never before<br/>
              <span className={Style.description}> Search for repositories that speak your language,<br/>unlock hidden gems, and<br/> connect with a vibrant community of<br/> developers worldwide.<br/></span>
        </p>
      </div>
    </div>
  )
}

export default Home