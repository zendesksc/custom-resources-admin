import React from 'react'

const TextField = ({ label, name, value, onChange }) => (
  <div className='form-group'>
    <label>{label}</label>
    <input className='form-control' type='text' name={name} value={value} onChange={onChange} />
  </div>
)

export default TextField