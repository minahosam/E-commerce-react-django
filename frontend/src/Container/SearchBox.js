import React,{useState} from 'react'
import { Form,Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'   

function SearchBox() {
    const [keyword,setKeyword] = useState('')
    let history = useHistory()
    const formHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push('/')
        }    
    }
  return (
    <Form onSubmit={formHandler}>
        <Form.Group controlId='search'>
            <Form.Control
                value={keyword}
                type='text'
                placeholder='Search Content'
                onChange={(e) =>setKeyword(e.target.value)}
                name='q'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit' >submit</Button>
    </Form>
  )
}

export default SearchBox