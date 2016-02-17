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
      items: [],
      loading: true,
      err: false
    };
  },

  render () {
    return (
      <div>
        <div className="CarouselHeader">
          <div className="label">{this.props.config.label}</div>
          <div>
            <Filters onSelectFilter={this.onSelectFilter} filters={this.props.config.filters} />
            { this.state.loading ? <img className="loading" src="/img/loader.gif" />: null }
            <Shuffle onShuffle={this.onShuffle} />
          </div>
        </div>
        <div>
          <ul className="CarouselList">
            {
              this.state.items.map(function(item, idx) {
                if(idx < this.props.config.max_show)
                return (
                  <li key={idx}>
                    <MediaItem item={item}/>
                  </li>
                )
              }, this)
            }
          </ul>
        </div>
      </div>

    )
  },

  onSelectFilter (filterValue) {
    var movieParams =  {"programType": this.props.config.programType, "starttime": filterValue};
    this.setState({"loading": true});

    API('cards', movieParams, (err, data) => {
      if(err) {
        this.setState({"err": true, "loading": false});
      } else {
        this.setState({"items": data.content, "loading": false});
      }

    });
  },

  onShuffle () {
    this.setState({"items": _.shuffle(this.state.items)});
  }

});

export default Carousel
