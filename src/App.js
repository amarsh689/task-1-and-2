import React from 'react'
import Home from './component/Home'
import RegistrationForm from './component/RegistrationForm';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import LoginForm from './component/LoginForm';
import Pages from './component/Pages';
const App = () => {
  return (
   <>

 <Router>
 <Routes>
 <Route path='/' element={<RegistrationForm/>}/>
 <Route path='Login'element={<LoginForm/>}/>
< Route path='page' element={<Pages/>}/>
 </Routes>
  </Router>

  
  


      
   
   </>
  )
}

export default App