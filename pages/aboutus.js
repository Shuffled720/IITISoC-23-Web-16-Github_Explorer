import React from 'react'
import Style from '../styles/aboutus.module.css'

const aboutus = () => {
  return (
    <div className={Style.about}>
        <div className={Style.cat}>
        <img className={Style.blackcat}  src='/Screenshot 2023-06-11 150834_preview_rev_1.png' />
        </div>
        <div className={Style.webinfo}>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque quia laboriosam expedita corporis natus dolores, autem possimus iste maiores ratione id aut voluptas! Eius molestias perferendis quod rem, facilis amet neque aspernatur maxime ab magnam reprehenderit dolorum qui fuga voluptatum quas molestiae illum earum consequatur saepe nesciunt libero, dolores harum.</p>
        </div>
        <div className={Style.creator}>creator</div>
        <div className={Style.firstpic}>
        <img className={Style.pic1} src='/Ellipse 2.png' alt="Harsh Sinha" />
        </div>
        <div className={Style.secondpic}>
        <img src='/Ellipse 3.png' alt="Kaushiki" />
        </div>
        <div className={Style.firstInfo}>inf1</div>
        <div className={Style.secondInfo}>inf2</div>

    </div>
  )
}

export default aboutus