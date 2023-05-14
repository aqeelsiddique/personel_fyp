import React from 'react'
import Img from '../mainpage.jpg'
import { NavLink } from "react-router-dom";

import './index.css'

const start = () => {
  return (
    <>
        <div className="start" style={{backgroundImage: ` url(${Img}) `,
        backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width:'100%',
                height:'100vh',
                objectFit:'cover'}}>
            <button > <NavLink to="/teams" style={{color:'white',textDecoration:'none'}} >Start</NavLink> </button>
        </div>
    </>
  )
}

export default start
