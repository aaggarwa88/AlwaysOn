import React, { PropTypes } from 'react'
import cx from 'classnames'

import style from './Filters.scss'

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
      active: active,
    };
  },

  render () {
    return (
      <div className="filters">
        {
          this.props.filters.map((item) => {
            return (
              <div className={cx('node', {
                'active': item === this.state.active
                })} onClick={this.onClickNode.bind(null, item)}>
                {item.label}
              </div>
            )
          })
        }
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
