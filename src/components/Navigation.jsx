import React from 'react'
import logo from '../assets/logo.png'
import { Tilt } from 'react-tilt'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="dt w-100 border-box pa3 ph5-ns" >
      <Link className="dtc v-mid mid-gray dim w-25" to={'/'} title="Home">
        <img src={logo} className="dib w2 h2 br-100" alt="Site Name"/>
      </Link>
      <div className="dtc v-mid w-75 tr">
        <Link className="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" to="/sign-in" title="Store">Sign In </Link>
        <Link className="link dim dark-gray f6 f5-ns dib" to={'/sign-up'} title="Contact">Sign Up</Link>
      </div>
    </nav>
  )
}

export default Navigation
