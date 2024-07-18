import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Landing from './Pages/Landing/Landing'
import Signup from './Pages/Auth/Signup'
import Payment from './Pages/Payment/Payment'
import Cart from './Pages/Cart/Cart'
import Orders from './Pages/Orders/Orders'

const Routing = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/auth' element={<Signup />} />
            <Route path='/payements' element={<Payment />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/cart' element={<Cart/>} />
        </Routes>
    </Router>
  )
}

export default Routing