import React, { Component } from 'react'

import TextField from '../components/TextField'

class NewResourceTypeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: {
        value: '',
        error: ''
      },
      key: {
        value: '',
        error: ''
      },
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

    this.handleChange = this.handleChange.bind(this)
    this.handleAddNewField = this.handleAddNewField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteField = this.handleDeleteField.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: { value: e.target.value, error: '' }
    })
  }

  handleFieldChange(index, e) {
    let name = e.target.name
    let value = e.target.value

    this.setState({
      fields: this.state.fields.map((field, i) => {
        if (i === index) return { ...field, [name]: value }
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

  handleSubmit() {

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

    if (!isValid) return

    // Push the resource object to the parent when sucessfully submitted
    this.props.onSuccess(this.state)
  }

  render() {
    console.log(this.state)
    return (
      <div>

        <div className='row'>
          <div className='col-6'>
            <TextField label='Title' name='title' value={this.state.title.value} error={this.state.title.error} onChange={this.handleChange} />
          </div>
          <div className='col-6'>
            <TextField label='Key' name='key' value={this.state.key.value} error={this.state.key.error} onChange={this.handleChange} />
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
                      <TextField label='Name' name='name' value={field.name} onChange={this.handleFieldChange.bind(this, index)} />
                    </div>
                    <div className='col-6'>
                      <TextField label='Description' name='description' value={field.description} onChange={this.handleFieldChange.bind(this, index)} />
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

        <div>
          <button className='btn btn-primary float-right' onClick={this.handleSubmit}>Save</button>
        </div>
      </div>
    )
  }
}

export default NewResourceTypeForm
