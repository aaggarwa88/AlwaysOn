import React, { PropTypes } from 'react'

import API from '../data/API';
import Filters from '../components/Carousel/Filters';
import Shuffle from '../components/Carousel/Shuffle';
import MediaItem from '../components/MediaItem';

import _ from 'underscore';

import style from './Carousel.scss';


const Carousel = React.createClass({

  getInitialState: function() {
    return {
      items: []
    };
  },

  render () {
    return (
      <div>
      <div className="CarouselHeader">
        <div className="label">{this.props.config.label}</div>
        <div>
          <Filters onSelectFilter={this.onSelectFilter} filters={this.props.config.filters} />
          <Shuffle onShuffle={this.onShuffle} />
        </div>
      </div>
      <div>
        <ul className="CarouselList">
        {
          this.state.items.map(function(item, idx) {
            if(idx < 6)
            return (
              <li key={idx}>
                <MediaItem item={item}/>
              </li>
            )
          })
        }
        </ul>
      </div>
    </div>

    )
  },

  onSelectFilter (filterValue) {
    var movieParams =  {"programType": "movies", "starttime": filterValue};
    API('cards', movieParams, (data) => {
      this.setState({"items": data.content});
    });
  },

  onShuffle () {
    this.setState({"items": _.shuffle(this.state.items)});
  }

});

export default Carousel
