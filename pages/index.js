import React from 'react'


const handleOnClick = (e)  => {
  e.preventDefault()
  window.location.href = "/login"
}
const Home = () => {
  return (
    <div>Home
      <div>
        <button onClick={handleOnClick}>get started</button>
      </div>
    </div>
  )
}

export default Home