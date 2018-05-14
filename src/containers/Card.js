import React, { Component } from 'react'
import NewResourceTypeForm from './NewResourceTypeForm';
import ResourcesList from './ResourcesList';

const MODES = {
  NEW_RESOURCE_TYPE_FORM: 0,
  RESOURCES_LIST: 1
}

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: MODES.NEW_RESOURCE_TYPE_FORM,
      resourceType: {}
    }

    this.handleNewResourceTypeFormSuccess = this.handleNewResourceTypeFormSuccess.bind(this)
  }

  componentDidMount() {
    if (this.props.resourceType !== undefined) {
      this.setState({
        mode: MODES.RESOURCES_LIST,
        resourceType: this.formatResourceType(this.props.resourceType)
      })
    } else {
      this.setState({
        resourceType: {}
      })
    }
  }

  formatResourceType(resourceType) {
    // We've formatted the resourceType in a particular way that makes it easier to work
    // with the data in React. This function basically converts the schema.properties
    // into an array that can be mapped over in ResourcesList.

    let fields = []
    let rawProperties = resourceType.schema.properties

    for (let key in rawProperties) {
      fields.push({
        name: key,
        type: rawProperties[key].type,
        description: rawProperties[key].description
      })
    }

    return {
      title: resourceType.key,
      key: resourceType.key,
      fields: fields
    }

  }

  handleNewResourceTypeFormSuccess(submittedResourceType) {
    this.setState({
      resourceType: this.formatResourceType(submittedResourceType)
    })
    this.props.onNewResourceTypeSuccess(submittedResourceType)
  }

  render() {

    if (this.state.mode === MODES.NEW_RESOURCE_TYPE_FORM) {
      return (
        <div className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-6'>
                <h4 className='mb-0'>New Resource Type</h4>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <NewResourceTypeForm
              onSuccess={this.handleNewResourceTypeFormSuccess} />
          </div>
        </div>
      )
    }

    if (this.state.mode === MODES.RESOURCES_LIST) {
      return (
        <div className='card mb-4'>
          <div className='card-header' data-toggle="collapse" data-target={'#' + this.state.resourceType.key}>
            <div className='row'>
              <div className='col-6'>
                <h4 className='mb-0'>{this.state.resourceType.key}</h4>
              </div>
              <div className='col-6'>
                <button className='btn btn-outline-danger float-right'>Delete</button>
              </div>
            </div>
          </div>
          <div className='collapse show' id={this.state.resourceType.key}>
            <div className='card-body'>
              <ResourcesList resourceType={this.state.resourceType} />
            </div>
          </div>
        </div>
      )
    }

  }
}

export default Card
