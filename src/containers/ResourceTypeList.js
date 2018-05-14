import React, { Component } from 'react'
import Card from './Card'

class ResourceTypeList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      resourceTypes: []
    }
  }

  componentDidMount() {
    // Fetch resource types from API and set to state
    window.client.request({
      url: '/api/custom_resources/resource_types',
      type: 'GET'
    }).then((res) => {
      this.setState({
        resourceTypes: res.data
      })
    })
      .catch((err) => console.log(err))
  }

  render() {
    let resourceTypes = this.state.resourceTypes.map((resourceType, index) => <Card key={index} resourceType={resourceType} />)

    return (
      <div>
        {resourceTypes}
        <Card />
      </div>
    )
  }
}

export default ResourceTypeList
