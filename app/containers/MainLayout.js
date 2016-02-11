import React, { PropTypes } from 'react'
import Carousel from '../components/Carousel'

import configs from './carouselConfig.json'

const Layout = React.createClass({

  render () {

    return (
      //Movies Carousel
      <Carousel config={configs.movies}></Carousel>
      //Tv Carousel
      //Trailer Carousel
    )
  }
})

export default Layout
