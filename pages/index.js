import React from 'react'
import Style from '../styles/index.module.css'


const handleStartClick = (e)  => {
  e.preventDefault()
  window.location.href = "/login"
}
const handleSearchClick = (e)  => {
  e.preventDefault()
  window.location.href = "/search"
}
const handleAboutClick = (e)  => {
  e.preventDefault()
  window.location.href = "/about"
}
const Home = () => {
  return (
    <div className={Style.btn}>
      <div>
        <button onClick={handleStartClick}>get started</button>
      </div>
      <div>
        <button onClick={handleSearchClick}>explore</button>
      </div>
      <div>
        <button onClick={handleAboutClick}>About us</button>
      </div>

    </div>
  )
}

export default Home