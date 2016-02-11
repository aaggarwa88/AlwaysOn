import React from 'react'
import App from '../../app/containers/App';

class AlwaysOn extends React.Component {
  constructor () {
    super()
  }
  render () {
    return <div>
      <App />
    </div>
  }
}

window.addEventListener('load', () => {
  React.render(<AlwaysOn />, document.querySelector('#reactApp'));
});
