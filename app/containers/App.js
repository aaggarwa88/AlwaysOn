import style from './App.scss';

import React, { PropTypes, Component } from 'react'
import Header from '../components/Header';
import MainLayout from './MainLayout';

import API from '../data/API';

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
        <MainLayout items={this.state.movieData.content}></MainLayout>
      </div>
    )
  }
  componentDidMount() {
    var movieParams =  {"programType": "movies", "starttime": "next30min"};
    API('cards', movieParams, (data) => {
      this.setState({"movieData": data});
    });
  }
}
