import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom';
import cx from 'classnames'
import style from './FilterItem.scss'
import $ from 'jquery';

const underlineWidth = 30;

const FilterItem = React.createClass({
  render () {
    return (
      <div className={cx("filterItem", this.props.isActive ? "active" : "")}>
        <div className="text">{this.props.item.label}</div>
        <div className="underline"></div>
      </div>
    )
  },

  componentWillReceiveProps(prevProps, prevState) {
    //center menu bar
    const _this = $(ReactDOM.findDOMNode(this));
    const width = $('.text', _this).width();

    //set the x value position for menu bar
    const x = (width / 2) - (underlineWidth / 2) ;
    $(".underline", _this).css({"left": x + "px"})

  }

})

export default FilterItem
