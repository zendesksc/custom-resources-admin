import React, { Component } from 'react';
import ResourceTypeList from './containers/ResourceTypeList';


class App extends Component {
  render() {
    return (
      <div className='container pt-5 pb-5'>
        <div className='row'>
          <div className='col-12'>
            <ResourceTypeList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
