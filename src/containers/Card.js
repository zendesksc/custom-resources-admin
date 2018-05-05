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
      resourceType: {
        title: 'Product',
        key: 'product',
        fields: [
          {
            name: 'id',
            type: 'string',
            description: 'The id of the product'
          },
          {
            name: 'name',
            type: 'string',
            description: 'The name of the product'
          }
        ]
      }
    }

    this.handleNewResourceTypeFormSuccess = this.handleNewResourceTypeFormSuccess.bind(this)
  }

  handleNewResourceTypeFormSuccess(submittedResourceType) {
    this.setState({
      mode: MODES.RESOURCES_LIST,
      resourceType: submittedResourceType
    })
  }

  render() {

    if (this.state.mode === MODES.NEW_RESOURCE_TYPE_FORM) {
      return (
        <div className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-12'>
                <h4 className='mb-0'>Resource Type</h4>
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
        <div className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-12'>
                <h4 className='mb-0'>{this.state.resourceType.title}</h4>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <ResourcesList resourceType={this.state.resourceType} />
          </div>
        </div>
      )
    }

  }
}

export default Card
