import React, { PropTypes } from 'react'

import TweenMax from "gsap";
import {Container, Grid, Breakpoint, Span} from 'react-responsive-grid'

import API from '../data/API';
import RibbonLabel from '../components/Carousel/RibbonLabel';
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
          <Grid columns={12}>
            <Span columns={2}>
              <RibbonLabel text={this.props.config.label} />
            </Span>
            <Span  columns={8}>
                <Filters loading={this.state.loading} onSelectFilter={this.onSelectFilter} filters={this.props.config.filters} />
            </Span>
            <Span columns={2} last>
              <div>
                <Shuffle onShuffle={this.onShuffle} />
              </div>
            </Span>
          </Grid>
        </div>
        <div>
          <ul className="CarouselList">
            {
              this.state.items.map(function(item, idx) {
                if(idx < this.props.config.max_show)
                  return (
                    <li key={idx}>
                      <MediaItem showTrailer={this.props.showTrailer.bind(null,item)} item={item}/>
                    </li>
                  )
              }, this)
            }
          </ul>
        </div>
      </div>

    )
  },

  componentDidUpdate(prevProps, prevState) {
    if(this.state.loading == false) {
      TweenMax.set(".CarouselList li", {opacity: "0", bottom:"-50px"});
      TweenMax.staggerTo(".CarouselList li", .5, {opacity: "1", bottom: "0", ease:Power2.easeInOut}, 0.1);
    }
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
