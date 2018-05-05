import React, { Component } from 'react';
import Card from './containers/Card'

class App extends Component {
  render() {
    return (
      <div className='container pt-5 pb-5'>
        <div className='row'>
          <div className='col-12'>
            <Card />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
