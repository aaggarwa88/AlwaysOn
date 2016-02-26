import React, { PropTypes, Component } from 'react';
import style from './Header.scss';
import {Container, Grid, Breakpoint, Span} from 'react-responsive-grid'

import moment from 'moment';

export default class Header extends Component {

  render() {
    return (
      <header className={style.header}>
        <div>
          <Grid id="headerContent" columns={12}>
            <Span className="leftContainer" columns={2}>
            </Span>
            <Span  className="centerContainer"  columns={8}>
              <img className="logo" src="/img/globe_logo.png" />
            </Span>
            <Span className="rightContainer" columns={2} last>
              <div className="menu"><img src="/img/icon-menu-grid.png" /></div>
            </Span>
          </Grid>
          { this.props.trailerDescription ? 
            <div className="fancy trailerName">
              <div>{this.props.trailerDescription}</div>
            </div> : null }
        </div>
      </header>
    );
  }
}
