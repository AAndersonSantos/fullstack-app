import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/login/login'
import Register from './pages/register/register'
import Profile from './pages/profile/profile'
import Posts from './pages/posts/table-posts/pageTablePosts'
import CreatePosts from './pages/posts/create-posts/pageCreatePosts'

function Routers() {
  return (
    <Router>
        <Routes>
          <Route exact path='/' element={ <Login /> }/>
          <Route exact path='/login' element={ <Login /> }/>
          <Route path='/register' element={ <Register /> }/>
          <Route exact path='/profile' element={ <Profile /> }/>
          <Route exact path='/posts' element={ <Posts /> }/>
          <Route exact path='/create-posts' element={ <CreatePosts /> }/>
        </Routes>
      </Router>
  );
}

export default Routers;