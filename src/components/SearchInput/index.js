import React from 'react'
import { FormControl, FormGroup } from 'react-bootstrap'

function SearchInput({handleChange, query, name}) {
  return (
    <FormGroup className='mb-3'>
      <FormControl 
        type='text'
        placeholder='Masukkan pencarian disini'
        value={query}
        name={name}
        onChange={handleChange}
      />
    </FormGroup>
  )
}

export default SearchInput