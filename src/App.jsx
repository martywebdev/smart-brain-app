import React from 'react'
import Navigation from './components/Navigation'
import logo from './assets/logo.png'
import ImageLinkForm from './components/ImageLinkForm'
import Rank from './components/Rank'
import ParticlesBg from 'particles-bg'

const App = () => {
  return (
    <>
    <header className='shadow-4'>
      <Navigation />
    </header>
    <main class="dt w-100 ">
    <div class="dtc v-mid tc dark-gray ph3 ph4-l">
      <h1 class="f1 lh-title tc">Paste Your Image URL</h1>
      <ImageLinkForm />
    </div>
    </main>
    </>
  )
}

export default App
