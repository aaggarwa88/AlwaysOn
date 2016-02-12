import React, { PropTypes, Component } from 'react';
import style from './Header.css';

export default class Header extends Component {

  render() {
    return (
      <header className={style.header} >
          <div id="headerContent">
            <img src="/img/logo.png" />
          </div>
      </header>
    );
  }
}
