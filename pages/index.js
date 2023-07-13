import React from 'react'
import Style from '../styles/index.module.css'


const Home = () => {
  return (
    
    <div className={Style.homePg}>
      <div className={Style.cat}>
      <img className={Style.blackcat}  src='/Screenshot 2023-06-11 150834_preview_rev_1.png' />
      </div>
      <div className={Style.para}>
        <p>hello</p>
      </div>
    </div>
  )
}

export default Home