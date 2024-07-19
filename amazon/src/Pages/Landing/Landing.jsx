import React from 'react'

import Products from '../../Components/Products/Products'
import Catagory from '../../Components/Catagory/Catagory'
import Layout from '../../Components/LayOut/Layout'
import CarouselEffect from '../../Components/Carousel/Carousel'
import Category from '../../Components/Catagory/Catagory'

const Landing = () => {
  return (
    <Layout>
        <CarouselEffect />
        <Category />
        <Products />
    </Layout>
  )
}

export default Landing