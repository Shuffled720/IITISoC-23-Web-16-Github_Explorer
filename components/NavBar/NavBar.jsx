import React from 'react'
import Image from "next/image";
import Style from './NavBar.module.css';
import image from "../../public";




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
        <button className={Style.login}>Sign-in</button>
        </div>
    </div>
  )
}

export default NavBar