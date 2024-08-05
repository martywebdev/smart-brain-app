import React from 'react'
import { Tilt } from 'react-tilt'
import logo from '../assets/logo.png'
const Logo = () => {
  return (
    <div className='ma4 mt0'>
        <Tilt className='tilt br2 shadow-2' options={{max: 55}} style={{ height: 150, width: 150 }}>
            <div className='pa3 tc pt4'>
                <img src={logo} alt="" />
            </div>
        </Tilt>
    </div>
  )
}

export default Logo
