import React from 'react'
import logo from '../assets/logo.png'
import { Tilt } from 'react-tilt'

const Navigation = () => {
  return (
    // <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
    //     <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
    // </nav>
    <nav className="dt w-100 border-box pa3 ph5-ns ">
      <a className="dtc v-mid mid-gray link dim w-25" href="#" title="Home">
        <Tilt options={{max: 40}} className='tc' style={{height: 50, width: 50}}>
        <img src={logo} className="dib w2 h2 br-100" alt="Site Name" />
        </Tilt>
      </a>
      <div className="dtc v-mid w-75 tr">
        <a className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#" title="About">Services</a>
        <a className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#" title="Store">Blog</a>
        <a className="link dim dark-gray f6 f5-ns dib" href="#" title="Contact">Join Us</a>
      </div>
    </nav>


  )
}

export default Navigation
