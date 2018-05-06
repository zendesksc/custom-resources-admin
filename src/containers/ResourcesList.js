import React, { Component } from 'react'

class ResourcesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      resources: [],
      form: this.setFormFields()
    }

    this.handleNewResource = this.handleNewResource.bind(this)
    this.handleSaveResource = this.handleSaveResource.bind(this)
    this.handleEditFormField = this.handleEditFormField.bind(this)
    this.handleDeleteResource = this.handleDeleteResource.bind(this)
  }

  setFormFields() {
    return this.props.resourceType.fields.reduce((map, obj) => {
      map[obj.name] = ''
      return map
    }, {})
  }

  handleNewResource(e) {
    this.setState({
      isEditing: true
    })
  }

  handleSaveResource(e) {
    // TODO: AJAX POST the new resource
    this.setState({
      isEditing: false,
      resources: this.state.resources.concat(this.state.form),
      form: this.setFormFields()
    })
  }

  handleEditFormField(e) {
    let name = e.target.name
    let value = e.target.value

    this.setState({
      form: { ...this.state.form, [name]: value }
    })
  }

  handleDeleteResource(index, e) {
    this.setState({
      resources: this.state.resources.filter((resource, i) => i !== index)
    })
  }

  render() {
    return (
      <div>
        <div>
          <table className='table'>
            <thead>

              <tr>
                {this.props.resourceType.fields.map((field, index) => (
                  <th key={index}>{field.name.value}</th>
                ))}
                <th></th>
              </tr>

            </thead>
            <tbody>

              {this.state.resources.map((resource, index) => (
                <tr key={index}>
                  {this.props.resourceType.fields.map((field, index) => (
                    <td key={index}>{resource[field.name.value]}</td>
                  ))}
                  <td><button className='btn btn-outline-danger' onClick={this.handleDeleteResource.bind(this, index)}>Delete</button></td>
                </tr>
              ))}

              {this.state.isEditing ?
                <tr>
                  {this.props.resourceType.fields.map((field, index) => (
                    <td key={index}>
                      <input className='form-control' type='text' name={field.name.value} onChange={this.handleEditFormField} />
                      <small className="form-text text-muted">{field.description.value}</small>
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
            <button className='btn btn-link' onClick={this.handleNewResource} disabled={this.state.isEditing}>New {this.props.resourceType.title.value}</button>
          </div>
          : null}
      </div>
    )
  }
}

export default ResourcesList
