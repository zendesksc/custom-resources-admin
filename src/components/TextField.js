import React from 'react'

const TextField = ({ label, name, value, onChange }) => (
  <div>
    <label className='c-txt__label'>{label}</label>
    <input className='c-txt__input' type='text' name={name} value={value} onChange={onChange} />
  </div>
)

export default TextField