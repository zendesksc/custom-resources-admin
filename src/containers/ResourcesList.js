import React, { Component } from 'react'

class ResourcesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      resources: [
        {
          id: '8883124',
          name: 'iPhone 8',
          barcode: '1294738572957283'
        }
      ],
      form: {
        id: '',
        name: '',
        barcode: ''
      }
    }

    this.handleNewResource = this.handleNewResource.bind(this)
    this.handleSaveResource = this.handleSaveResource.bind(this)
  }

  handleNewResource(e) {
    this.setState({
      isEditing: true
    })
  }

  handleSaveResource(e) {
    this.setState({
      isEditing: false,
      resources: this.state.resources.concat(this.state.form)
    })
  }

  render() {
    return (
      <div>
        <div>
          {this.props.resourceType.title}
        </div>
        <div>
          <table>
            <thead>

              <tr>
                {this.props.resourceType.fields.map((field, index) => (
                  <th key={index}>{field.name}</th>
                ))}
                <th></th>
              </tr>

            </thead>
            <tbody>

              {this.state.resources.map((resource, index) => (
                <tr key={index}>
                  <td>{resource.id}</td>
                  <td>{resource.name}</td>
                  <td>{resource.barcode}</td>
                  <td><button>Delete</button></td>
                </tr>
              ))}

              {this.state.isEditing ?
                <tr>
                  <td>
                    <input type='text' name='id' value={this.state.form.id} />
                  </td>
                  <td>
                    <input type='text' name='name' value={this.state.form.name} />
                  </td>
                  <td>
                    <input type='text' name='barcode' value={this.state.form.barcode} />
                  </td>
                  <td>
                    <button onClick={this.handleSaveResource}>Save</button>
                  </td>
                </tr>
                : null}

            </tbody>
          </table>
        </div>
        <div>
          <button onClick={this.handleNewResource}>New {this.props.resourceType.title}</button>
        </div>
      </div>
    )
  }
}

export default ResourcesList
