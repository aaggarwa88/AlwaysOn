import React, { PropTypes } from 'react'
import MenuUnderline from './MenuUnderline.js'

import style from './Filters.scss'
import $ from 'jquery'

import FilterItem from "./FilterItem";
const refKey = "filter_";

const Filters = React.createClass({

  getInitialState() {

    var active = null;
    for(var i = 0; i < this.props.filters.length; i++) {
        if(this.props.filters[i].default) {
          active = this.props.filters[i];
        }
    }

    this.props.onSelectFilter(active.value);

    return {
      active: active
    };
  },

  render () {
    return (
      <div className="filtersContainer">
        <ul className="filters">
          {
            this.props.filters.map((item) => {
              return (
                <li>
                  <div className="node" ref={refKey + item.value} onClick={this.onClickNode.bind(null, item)}>
                    <FilterItem isActive={item === this.state.active} item={item}></FilterItem>
                  </div>
                </li>
              )
            })
          }
          <li className="loading">
          {  this.props.loading ? <img  src="/img/loader.gif" /> : null }
          </li>

        </ul>
      </div>
    )
  },

  onClickNode(item) {
    this.props.onSelectFilter(item.value);

    this.setState({
      active: item
    });
  },

})

export default Filters
