import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarComponent from '../../../components/navbar/navBar'
import TablePosts from '../../../components/tablePosts/tablePosts'
import './stylePageTablePosts.scss'

function PageTablePosts() {
  let navigate = useNavigate()

   //Check if exist token in localStorage
  useEffect(() => {
    if (!localStorage.usertoken) {
      navigate(`/login`)
    }
  })

  function navigateCreatePosts() {
    navigate(`/create-posts`)
  }

  //function to change the background color of the table posts page
  useEffect(() => {
    document.body.style.backgroundColor = "#CFCFCF"
  })

  return (
    <>
      < NavbarComponent />
      <div className='container-posts'>
        <section>
          <TablePosts />
        </section>

        <button className='btn-add' onClick={navigateCreatePosts} >Adicionar Posts</button>
      </div>
    </>
  )
}

export default PageTablePosts;