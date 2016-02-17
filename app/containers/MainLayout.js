import React, { PropTypes } from 'react'
import Carousel from './Carousel'

import configs from './carouselConfig.json'

const Layout = React.createClass({

  render () {

    return (
      <div>
        <Carousel config={configs.movies}></Carousel>
        
      </div>
    )
  }
})

export default Layout
