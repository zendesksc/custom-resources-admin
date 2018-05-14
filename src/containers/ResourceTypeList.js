import React, { Component } from 'react'
import Card from './Card'

class ResourceTypeList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      resourceTypes: []
    }

    this.addSubmittedResourceTypeToState = this.addSubmittedResourceTypeToState.bind(this)
    this.removeResourceTypeFromState = this.removeResourceTypeFromState.bind(this)
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    })

    // Fetch resource types from API and set to state
    window.client.request({
      url: '/api/custom_resources/resource_types',
      type: 'GET'
    }).then((res) => {
      this.setState({
        isLoading: false,
        resourceTypes: res.data
      })
    })
      .catch((err) => console.log(err))
  }

  addSubmittedResourceTypeToState(resourceType) {
    this.setState({
      resourceTypes: this.state.resourceTypes.concat(resourceType)
    })
  }

  removeResourceTypeFromState(key) {
    this.setState({
      resourceTypes: this.state.resourceTypes.filter((resourceType) => resourceType.key !== key)
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    let resourceTypes = this.state.resourceTypes.map((resourceType, index) =>
      <Card
        key={index}
        resourceType={resourceType}
        onDelete={this.removeResourceTypeFromState}
      />
    )

    return (
      <div>
        {resourceTypes}

        <Card onNewResourceTypeSuccess={this.addSubmittedResourceTypeToState} />
      </div>
    )
  }
}

export default ResourceTypeList
