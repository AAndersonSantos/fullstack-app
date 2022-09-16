import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPowerOff } from 'react-icons/fa'
import './styleLogout.scss'

function LogOut() {
  
  let navigate = useNavigate()

  //Check if exist token in localStorage
  function logout(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    navigate(`/login`)
  }

  return (
    <div onClick={logout} className='container-logout'>
      <button><FaPowerOff /></button>
      <p className='text-logout'>Logout</p>
    </div>
  )
}

export default LogOut;