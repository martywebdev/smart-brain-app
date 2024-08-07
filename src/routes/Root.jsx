import React from 'react'
import Navigation from '../components/Navigation'
import { Outlet } from 'react-router-dom'

const Root = () => {
  
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="dt w-100 ">
        <div className="dtc v-mid dark-gray ph3 ph4-l">
            <Outlet />
        </div>
      </main>
    </>
  )
}

export default Root
