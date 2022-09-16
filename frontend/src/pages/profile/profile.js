import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import NavbarComponent from '../../components/navbar/navBar'
import './styleProfile.scss'

function Profile() {

  let navigate = useNavigate()

  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  //function to get the token datas
  useEffect(() => {
    if (localStorage.usertoken) {

      const token = localStorage.usertoken
      const decoded = jwt_decode(token)

      setState({
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email
      })

    }
  }, [])

  //Check if exist token in localStorage
  useEffect(() => {
    if (!localStorage.usertoken) {
      navigate(`/login`)
    }
  })

  //function to change the background color of the profile page
  useEffect(() => {
    document.body.style.backgroundColor = "#CFCFCF"
  })

  return (
    <>
      < NavbarComponent />
      <div className='container-dados'>
        <h1>Dados Do Usuário</h1>
        <p><label>Nome:</label> {state.first_name} {state.last_name}</p>
        <p><label>Email:</label> {state.email}</p>
      </div>
    </>
  )
}

export default Profile