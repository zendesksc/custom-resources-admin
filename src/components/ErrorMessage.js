import React from 'react'

const ErrorMessage = ({ errors }) => (
  <div className='row'>
    <div className='col-12'>
      <div className="alert alert-danger alert-dismissiblefade show" role="alert">
        {errors.map((error, index) => (
          <span key={index}><strong>{error.title}</strong> - {error.detail}</span>
        ))}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
)

export default ErrorMessage