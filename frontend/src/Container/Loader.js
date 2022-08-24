import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
  return (
    <Spinner animation="grow" role="status" variant="primary" style={{
      height:'100px',
      margin:'auto',
      width:'100px',
      display:'block'
    }} >
        <span >Loading...</span>
    </Spinner>
  )
}

export default Loader