import React, { Component } from 'react'
import NewResourceTypeForm from './NewResourceTypeForm';
import ResourcesList from './ResourcesList';
import ErrorMessage from '../components/ErrorMessage';

const MODES = {
  NEW_RESOURCE_TYPE_FORM: 0,
  RESOURCES_LIST: 1
}

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      errors: [],
      mode: MODES.NEW_RESOURCE_TYPE_FORM,
      resourceType: {}
    }

    this.handleNewResourceTypeFormSuccess = this.handleNewResourceTypeFormSuccess.bind(this)
    this.handleDeleteResourceType = this.handleDeleteResourceType.bind(this)
    this.handleNewError = this.handleNewError.bind(this)
  }

  componentDidMount() {
    if (this.props.resourceType !== undefined) {
      this.setState({
        mode: MODES.RESOURCES_LIST,
        resourceType: this.formatResourceType(this.props.resourceType)
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
      hasError: false,
      errors: [],
      resourceType: this.formatResourceType(submittedResourceType)
    })
    this.props.onNewResourceTypeSuccess(submittedResourceType)
  }

  handleDeleteResourceType() {
    let key = this.state.resourceType.key

    window.client.request({
      url: '/api/custom_resources/resource_types/' + key,
      type: 'DELETE'
    })
      .then((res) => {
        // When we delete a resource type, we need to delete all associated relationship types.
        let relationshipTypesPromises = []

        relationshipTypesPromises.push(
          window.client.request({
            url: '/api/custom_resources/relationship_types/' + key + '_has_many_users',
            type: 'DELETE'
          })
        )

        relationshipTypesPromises.push(
          window.client.request({
            url: '/api/custom_resources/relationship_types/' + key + '_has_many_tickets',
            type: 'DELETE'
          })
        )

        relationshipTypesPromises.push(
          window.client.request({
            url: '/api/custom_resources/relationship_types/' + key + '_has_many_organizations',
            type: 'DELETE'
          })
        )

        return Promise.all(relationshipTypesPromises)
      })
      .then((res) => this.props.onDelete(key))
      .catch((err) => {
        this.setState({
          hasError: true,
          errors: err.responseJSON.errors
        })
      })
  }

  handleNewError(errors) {
    this.setState({
      hasError: true,
      errors
    })
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
            {this.state.hasError ? <ErrorMessage errors={this.state.errors} /> : null}
            <NewResourceTypeForm
              onError={this.handleNewError}
              onSuccess={this.handleNewResourceTypeFormSuccess} />
          </div>
        </div>
      )
    }

    if (this.state.mode === MODES.RESOURCES_LIST) {
      return (
        <div className='card mb-4'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-6' data-toggle="collapse" data-target={'#' + this.state.resourceType.key}>
                <h4 className='mb-0'>{this.state.resourceType.key}</h4>
              </div>
              <div className='col-6'>
                <button
                  className='btn btn-outline-danger float-right'
                  onClick={this.handleDeleteResourceType}>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className='collapse show' id={this.state.resourceType.key}>
            <div className='card-body'>
              {this.state.hasError ? <ErrorMessage errors={this.state.errors} /> : null}
              <ResourcesList
                onError={this.handleNewError}
                resourceType={this.state.resourceType} />
            </div>
          </div>
        </div>
      )
    }

  }
}

export default Card
