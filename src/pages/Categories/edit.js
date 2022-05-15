import React, { useState } from 'react'
import { Container } from 'react-bootstrap';
import BreadCrumb from '../../components/BreadCrumb';
import Alert from '../../components/Alert';
import Form from './form';

function CategoryEdit() {
  const [form, setForm] = useState({
    name: '',
    avatar: ''
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {}

  return (
    <Container>
      <BreadCrumb 
        textSecond='Categories'
        textThird='Edit'
        urlSecond='/categories'
      />
      <Alert type='danger' message='Test message' />
      <Form 
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  )
}

export default CategoryEdit