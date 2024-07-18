import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header/Header'
import CarouselEffect from './Components/Carousel/Carousel'
import Catagory from './Components/Header/Catagory/Catagory'
import Products from './Components/Products/Products'
import Routing from './Routing'


function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <Routing />
  </>
  )
}

export default App
