import React from 'react'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import ParticlesBg from 'particles-bg'

const App = () => {
  return (
    <>
      <Navigation />  
      <Logo />
      <Rank />
      <ImageLinkForm />
      <ParticlesBg type="circle" bg={true} />
    </>
  )
}

export default App
