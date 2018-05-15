import React, { Component } from 'react'

class ResourcesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      isEditing: false,
      hasErrors: false,
      errors: [],
      resources: [],
      form: {}
    }

    this.handleNewResource = this.handleNewResource.bind(this)
    this.handleSaveResource = this.handleSaveResource.bind(this)
    this.handleEditFormField = this.handleEditFormField.bind(this)
    this.handleDeleteResource = this.handleDeleteResource.bind(this)
  }

  componentDidMount() {
    // Fetch resources from resource type
    window.client.request({
      url: '/api/custom_resources/resources?type=' + this.props.resourceType.key,
      type: 'GET'
    }).then((res) => {
      this.setState({
        resources: res.data
      })
    })
      .catch((err) => console.log(err))
  }

  handleNewResource(e) {
    this.setState({
      isEditing: true
    })
  }

  handleSaveResource(e) {
    // Set state to loading whilst resource is created
    this.setState({
      isLoading: true
    })

    // TODO: Validate form
    let isValid = true

    if (Object.keys(this.state.form).length === 0) {
      isValid = false
    }

    if (isValid) {

      // Create the data object including the type of resource by key
      let data = {
        data: {
          type: this.props.resourceType.key,
          attributes: this.state.form
        }
      }

      window.client.request({
        url: '/api/custom_resources/resources',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data)
      }).then((res) => {
        // Push the newly created resource to the state array of resources
        this.setState({
          isEditing: false,
          resources: this.state.resources.concat(res.data),
          form: {},
          isLoading: false
        })
      }).catch((err) => {
        this.setState({
          hasError: true,
          errors: err.responseJSON.errors
        })
      })

    } else {
      this.setState({
        isLoading: false
      })
    }

  }

  handleEditFormField(e) {
    let name = e.target.name
    let value = e.target.value

    this.setState({
      form: { ...this.state.form, [name]: value }
    })
  }

  handleDeleteResource(id, e) {
    // Delete a resource by id
    window.client.request({
      url: '/api/custom_resources/resources/' + id,
      type: 'DELETE'
    }).then((res) => {
      this.setState({
        resources: this.state.resources.filter((resource) => resource.id !== id)
      })
    }).catch((err) => {
      this.setState({
        hasError: true,
        errors: err.responseJSON.errors
      })
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <div>

        {this.state.hasError ?
          <div className='row'>
            <div className='col-12'>
              <div className="alert alert-danger alert-dismissiblefade show" role="alert">
                {this.state.errors.map((error, index) => (
                  <span key={index}><strong>{error.title}</strong> - {error.detail}</span>
                ))}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
          : null}

        <div>
          <table className='table'>
            <thead>

              <tr>
                {this.props.resourceType.fields.map((field, index) => (
                  <th key={index}>{field.name}</th>
                ))}
                <th></th>
              </tr>

            </thead>
            <tbody>

              {this.state.resources.map((resource) => (
                <tr key={resource.id}>
                  {this.props.resourceType.fields.map((field, index) => {
                    return (
                      <td key={index}>{resource.attributes[field.name]}</td>
                    )
                  })}
                  <td><button className='btn btn-outline-danger' onClick={this.handleDeleteResource.bind(this, resource.id)}>Delete</button></td>
                </tr>
              ))}

              {this.state.isEditing ?
                <tr>
                  {this.props.resourceType.fields.map((field, index) => (
                    <td key={index}>
                      <input className='form-control' type='text' name={field.name} onChange={this.handleEditFormField} />
                      <small className="form-text text-muted">{field.description}</small>
                    </td>
                  ))}
                  <td>
                    <button className='btn btn-primary' onClick={this.handleSaveResource}>Save</button>
                  </td>
                </tr>
                : null}

            </tbody>
          </table>
        </div>
        {!this.state.isEditing ?
          <div>
            <button className='btn btn-link' onClick={this.handleNewResource} disabled={this.state.isEditing}>New {this.props.resourceType.title}</button>
          </div>
          : null}
      </div>
    )
  }
}

export default ResourcesList
