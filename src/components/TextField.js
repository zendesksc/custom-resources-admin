import React from 'react'

const TextField = ({ label, name, value, error, onChange, disabled }) => (
  <div className='form-group'>
    <label>{label}</label>
    <input className={error ? 'form-control is-invalid' : 'form-control'} type='text' name={name} value={value} onChange={onChange} disabled={disabled} />
    <div className="invalid-feedback">
      {error}
    </div>
  </div>
)

export default TextField