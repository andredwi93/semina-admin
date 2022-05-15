import React from 'react'

function Thead({texts}) {
  return (
    <thead className='thead-dark'>
      <tr>
        {texts.map((text, index) => {
          return <th key={index}>{text}</th>
        })}
      </tr>
    </thead>
  )
}

export default Thead