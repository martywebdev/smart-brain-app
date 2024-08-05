import React from 'react'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import ParticlesBg from 'particles-bg'

const App = () => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }} className='mb4'>
      <Navigation />  
      <Logo />
      <Rank />
      <ImageLinkForm />
      <ParticlesBg type="circle" bg={true}  />
    </div>
  )
}

export default App
