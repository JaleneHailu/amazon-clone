import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header/Header'
import { Carousel } from 'react-responsive-carousel'
import CarouselEffect from './Components/Carousel/Carousel'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <Header />
  <CarouselEffect />
  </>
  )
}

export default App
