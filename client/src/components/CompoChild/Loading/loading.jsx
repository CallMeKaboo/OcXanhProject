import React from 'react'
import './loading.css'
import { Spinner } from 'react-bootstrap'

function Loading() {
  return (
    <Spinner animation="border" role="status" className='m-auto'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default Loading