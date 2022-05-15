import React from 'react'
import { FormControl } from 'react-bootstrap'

function TextInput({name, value, type, onChange, placeholder}) {
  return (
    <FormControl 
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}

export default TextInput