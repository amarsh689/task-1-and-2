import React from 'react'
import './Form.css'

import { render } from '@testing-library/react';
import { useState, useEffect } from 'react';
import { Form, Button, Stack } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Route,Routes ,Link} from 'react-router-dom';
// import { ResultType } from '@remix-run/router/dist/utils';
// import { response } from 'bootstrapp';
function RegistrationForm() {

  const [user, setuser] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      userName: "",
      password: "",
      confirmPassword: "",
    }
  );

  const [postdata,setpostdata]=useState([])
//   useEffect(() => { fetch("http://apicouture.nubiz.co.in/api/identity/ValidateEmailId?emailId=abc@gmail.com").then((result) => { result.json().then((resp) => { console.log("result", resp); }) }) })
//  // fetch("http://apicouture.nubiz.co.in/api/identity/ValidateEmailId?emailId=abc@gmail.com").then((result) => { result.json().then((resp) => { console.log("result", resp); setpostdata(resp) },[]) })

 
//  useEffect(() => {

// }, [])
 


  const [data, setdata] = useState(
    []
  )

  const handling = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value })
  }

  const handleSubmit = (e) => {

    console.log('Api call for email check user'+user);

    fetch('http://apicouture.nubiz.co.in/api/identity/ValidateEmailId?'+user.email)
    .then(data => {
    return data.json();
    })
    .then(value => {
    console.log("get api",value);

    if(value.failed){
      alert(value.message)
    }else{

      fetch(' http://apicouture.nubiz.co.in/api/identity/ValidateContactNo?contactNo='+user.contact)
      .then(data => {
      return data.json();
      })
      .then(value => {
        if(value.failed){
          alert(value.message)
        }else{

          fetch("http://apicouture.nubiz.co.in/api/identity/register", {
            method: "POST",
            body: JSON.stringify( {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNumber: user.contact,
              userName: user.userName,
              password: user.password,
              confirmPassword: user.confirmPassword,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(response => response.json())
            .then(json => {
              if(json.failed){
                alert(json.message)
              }else{
                alert(json.message)
              }
              console.log("post api",json)
            });
        }
      });
    }


    });

    
    // console.log(data);
    setdata([...data, user])
    console.log(data);
    e.preventDefault()

  }
  return (
    <>
      <div><h3 className='heading'>Registration Form</h3></div>

      <Form action='' onSubmit={handleSubmit} >
        <Stack className="hstack">
          <Form.Group className="mb-3" >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={user.firstName}
              onChange={handling}
              placeholder="first name"
              name='firstName'
            />

          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={user.lastName}
              onChange={handling}
              placeholder="last name"
              name='lastName'
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={user.email}
              onChange={handling}
              placeholder="Enter email"
              name='email'

            />

          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Contact No.</Form.Label>
            <Form.Control
              value={user.contact}
              onChange={handling}

              placeholder='Enter number'

              name='contact' />
          </Form.Group>


          <Form.Group className="mb-3" >
            <Form.Label>User Name</Form.Label>
            <Form.Control
              value={user.userName}
              onChange={handling}
              placeholder="user Name"
              name='userName'
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={user.password}
              onChange={handling}
              name="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              value={user.confirmPassword}
              onChange={handling}
              name="confirmPassword" placeholder="Confirm Password" />
          </Form.Group>

          <Button variant="dark" type="submit">
            Sign Up
          </Button>
          <Link to="Login">Log in</Link>
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

export default RegistrationForm