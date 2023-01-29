import React from 'react'
import './Form.css'
import { useState, useEffect } from 'react';
import { Form, Button, Stack } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
function LoginForm() {

  const [user, setuser] = useState(
    {
      
      email: "",
    
      password: "",
      
    }
  );

  const [postdata,setpostdata]=useState([])

 


  const [data, setdata] = useState(
    []
  )

  const handling = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value })
  }

  const handleSubmit = (e) => {

    console.log('Api call for email check user'+user);


    fetch("http://apicouture.nubiz.co.in/api/identity/token", {
        method: "POST",
        body: JSON.stringify( {
          email: user.email,
          password: user.password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => response.json())
        .then(json => {
          if(json.failed){
            alert(json.data.jwToken)
          }else{
            alert(json.data.jwToken)

          }
          console.log("post api",json)
        });

    
    setdata([...data, user])
    console.log(data);
    e.preventDefault()

  }
  return (
    <>
      <div><h3 className='heading'>Registration Form</h3></div>

      <Form action='' onSubmit={handleSubmit} >
        <Stack className="hstack">
        

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={user.email}
              onChange={handling}
              placeholder="Enter email"
              name='email'

            />

          </Form.Group>
       

          


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={user.password}
              onChange={handling}
              name="password" placeholder="Password" />
          </Form.Group>

       

          <Button variant="dark" type="submit">
            Log in
          </Button>

        </Stack>

      </Form>

      <div>{data.map((curElem) => {

        return (<div className='showData'>

          <p>{curElem.firstName}</p>
          <p>{curElem.lastName}</p>
          <p>{curElem.email}</p>
          <p>{curElem.userName}</p>
          <p>{curElem.password}</p>

          <p>{curElem.confirmPassword}</p>



        </div>)
      })}

      </div>

    </>
  )
}

export default LoginForm;