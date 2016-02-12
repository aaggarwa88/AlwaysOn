import React, { PropTypes, Component } from 'react';

import Header from './Header';
import MainLayout from './MainLayout';

import style from './App.scss';


export default class App extends Component{
  constructor () {
    super();
    this.state = {
      "movieData": {content: []}
    }
  }
  render () {
    return (
      <div>
        <Header />
        <MainLayout items={this.state.movieData.content}></MainLayout>
      </div>
    )
  }

}
