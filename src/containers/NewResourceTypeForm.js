import React, { Component } from 'react'

class NewResourceTypeForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      key: '',
      fields: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAddNewField = this.handleAddNewField.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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

  handleSubmit() {
    console.log('Do some AJAX to submit to the database')

    // Push the resource object to the parent when sucessfully submitted
    this.props.onSuccess(this.state)
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <label>Title</label>
            <input type='text' name='title' value={this.state.title} onChange={this.handleChange} />
          </div>
          <div>
            <label>Key</label>
            <input type='text' name='key' value={this.state.key} onChange={this.handleChange} />
          </div>
        </div>

        <div>
          {this.state.fields.map((field, index) => (
            <div key={index}>
              <div>
                <label>Name</label>
                <input type='text' name='name' value={field.name} onChange={this.handleFieldChange.bind(this, index)} />
              </div>
              <div>
                <label>Description</label>
                <input type='text' name='description' value={field.description} onChange={this.handleFieldChange.bind(this, index)} />
              </div>
            </div>
          ))}
        </div>

        <div>
          <button onClick={this.handleAddNewField}>Add new field</button>
        </div>

        <div>
          <button onClick={this.handleSubmit}>Save</button>
        </div>
      </div>
    )
  }
}

export default NewResourceTypeForm
