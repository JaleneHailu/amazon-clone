import React from 'react'

import Catagory from '../../Components/Header/Catagory/Catagory'
import Products from '../../Components/Products/Products'
import Layout from '../../Components/LayOut/Layout'
import CarouselEffect from '../../Components/Carousel/Carousel'

const Landing = () => {
  return (
    <Layout>
        <CarouselEffect />
        <Catagory />
        <Products />
    </Layout>
  )
}

export default Landing