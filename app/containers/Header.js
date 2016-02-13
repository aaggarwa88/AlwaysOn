import React, { PropTypes, Component } from 'react';
import style from './Header.scss';
import {Container, Grid, Breakpoint, Span} from 'react-responsive-grid'

import BackgroundVideo from '../components/BackgroundVideo';
import moment from 'moment';

export default class Header extends Component {

  render() {
    return (
      <header className={style.header}>
        <BackgroundVideo />
        <div>
          <Grid id="headerContent" columns={12}>
            <Span className="logoContainer" columns={2}>
              <img src="/img/logo.png" />
            </Span>
            <Span  className="dateContainer"  columns={8}>
              <img className="clock" src="/img/clock.png" />
              <div className="fancy todaysDate">
                <span>{moment().format('dddd, MMMM Do YYYY')} </span>
              </div>
            </Span>
            <Span className="userContainer" columns={2} last>
              <div className="user">Hi, Chris</div>
            </Span>
          </Grid>
        </div>
      </header>
    );
  }
}
