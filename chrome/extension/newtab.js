import React from 'react'
import Root from '../../app/containers/Root';

class AlwaysOn extends React.Component {
  constructor () {
    super()
  }
  render () {
    return <div>
      <Root />
    </div>
  }
}

window.addEventListener('load', () => {
  React.render(<AlwaysOn />, document.querySelector('#reactApp'));
});
