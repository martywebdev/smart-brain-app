import React from 'react'
import logo from '../assets/logo.png'
import { Tilt } from 'react-tilt'

const Navigation = () => {
  return (
    
    <nav className="dt w-100 border-box pa3 ph5-ns" >
      <a className="dtc v-mid mid-gray dim w-25" href="#" title="Home">
        <img src={logo} className="dib w2 h2 br-100" alt="Site Name"/>
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
