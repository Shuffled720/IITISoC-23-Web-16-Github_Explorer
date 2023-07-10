import React from 'react'
import Image from "next/image";
import Style from './NavBar.module.css';
import image from "../../public";

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


const NavBar = () => {
  return (
    <div className={Style.navbar}>
      <div className={Style.rect1}>
      
        <div className={Style.navbar_container_left}>
          <div className={Style.logo_img}>
         <Image 
         className={Style.logo_img}
          src = {image.catlogo}
          alt = "Cat logo"
          />
          </div>
          <div className={Style.Github}>Heaven</div>
          <div className={Style.exp}> Repo</div>
         
        </div>
        {/* <div className={Style.login}>Login</div> */}
        <button className={Style.login} onClick={handleStartClick}>Get-started</button>
        <button className={Style.explore} onClick={handleSearchClick}>explore</button>
        <button className={Style.about} onClick={handleAboutClick}>about-us</button>
        </div>
    </div>
  )
}

export default NavBar