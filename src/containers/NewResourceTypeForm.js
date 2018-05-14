import React, { Component } from 'react'
import slugify from '../utilities/slugify'

import TextField from '../components/TextField'

class NewResourceTypeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: '',
      title: '',
      key: '',
      fields: []
    }

    this.handleSystemFieldChange = this.handleSystemFieldChange.bind(this)
    this.handleAddNewField = this.handleAddNewField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteField = this.handleDeleteField.bind(this)
  }

  handleSystemFieldChange(e) {
    this.setState({
      title: e.target.value,
      key: slugify(e.target.value)
    })
  }

  handleFieldChange(index, e) {
    let name = e.target.name
    let value = e.target.value

    this.setState({
      fields: this.state.fields.map((field, i) => {
        console.log(field)
        if (i === index) return {
          // Force name to be lowercase
          ...field, [name]: name === 'name' ? value.toLowerCase() : value
        }
        return field
      })
    })
  }

  handleAddNewField(e) {
    this.setState({
      fields: this.state.fields.concat({
        name: '',
        type: 'string',
        description: ''
      })
    })
  }

  handleDeleteField(index, e) {
    this.setState({
      fields: this.state.fields.filter((field, i) => i !== index)
    })
  }

  checkIsValid() {
    let isValid = true

    if (this.state.title.value === '') {
      this.setState({
        title: { ...this.state.title, error: 'Title cannot be blank.' }
      })
      isValid = false
    }

    if (this.state.key.value === '') {
      this.setState({
        key: { ...this.state.key, error: 'Key cannot be blank.' }
      })
      isValid = false
    }

    this.state.fields.forEach((field, index) => {

      if (field.name.value === '') {
        this.setState({
          fields: this.state.fields.map((field, i) => {
            if (i === index) {
              field.name.error = 'Name cannot be blank.'
            }
            return field
          })
        })
        isValid = false
      }

      if (field.description.value === '') {
        this.setState({
          fields: this.state.fields.map((field, i) => {
            if (i === index) {
              field.description.error = 'Description cannot be blank.'
            }
            return field
          })
        })
        isValid = false
      }

    })

    return isValid
  }

  handleSubmit() {
    if (!this.checkIsValid()) return

    let properties = {}
    let required = []

    this.state.fields.forEach((field) => {
      properties[field.name] = {}
      properties[field.name].type = 'string'
      properties[field.name].description = field.description
      required.push(field.name)
    })

    let data = {
      data: {
        title: this.state.title,
        key: this.state.key,
        schema: {
          properties: properties,
          required: required
        }
      }
    }

    window.client.request({
      url: '/api/custom_resources/resource_types',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data)
    }).then(response => this.props.onSuccess(this.state))
      .catch(err => {
        console.log(err)
        return
      })

  }

  render() {
    return (
      <div>

        {this.state.error ?
          <div className='row'>
            <div className='col-12'>
              <div className="alert alert-danger alert-dismissible text-center fade show" role="alert">
                {this.state.error}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
          : null}

        <div className='row'>
          <div className='col-6'>
            <TextField label='Title' name='title' value={this.state.title} error={this.state.title.error} onChange={this.handleSystemFieldChange} />
          </div>
          <div className='col-6'>
            <TextField label='Key' name='key' value={this.state.key} disabled error={this.state.key.error} />
          </div>
        </div>

        <div>
          {this.state.fields.map((field, index) => (
            <div key={index} className='card mb-3'>

              <div className='card-header' data-toggle="collapse" data-target={'#field' + index}>
                <h5 className='mb-0 float-left'>
                  <button className="btn btn-link">
                    {field.name !== '' ? field.name : 'New Field'}
                  </button>
                </h5>
                <button className='btn btn-outline-danger float-right' onClick={this.handleDeleteField.bind(this, index)}>Delete field</button>
              </div>

              <div className='collapse show' id={'field' + index}>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-6'>
                      <TextField label='Name' name='name' value={field.name} error={field.name.error} onChange={this.handleFieldChange.bind(this, index)} />
                    </div>
                    <div className='col-6'>
                      <TextField label='Description' name='description' value={field.description} error={field.description.error} onChange={this.handleFieldChange.bind(this, index)} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div>
          <button className='btn btn-link float-left' onClick={this.handleAddNewField}>Add new field</button>
        </div>

        {this.state.fields.length > 0 ?
          <div>
            <button className='btn btn-primary float-right' onClick={this.handleSubmit}>Save</button>
          </div>
          : null}
      </div>
    )
  }
}

export default NewResourceTypeForm
