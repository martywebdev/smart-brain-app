import React from 'react'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import ParticlesBg from 'particles-bg'

const App = () => {
  return (
    <>
    {/* <div style={{ position: 'relative', minHeight: '100vh' }} className='mb4'> */}
      <Navigation />  
      <article className="vh-100 dt w-100">
  {/* <div class="dtc v-mid tc white ph3 ph4-l">
    <h1 class="f6 f2-m f-subheadline-l fw6 tc">Vertically centering things in css is easy!</h1>
  </div> */}
  <div className="dtc v-mid tc ph3 ph4-1">
  <ImageLinkForm />
  </div>
</article>


      {/* <Logo /> */}
      {/* <Rank /> */}
      {/* <ImageLinkForm /> */}
      <ParticlesBg type="circle" bg={true}  />
     {/* </div> */}
    </>
  )
}

export default App
