import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import * as yup from 'yup';
import "./styleLogin.scss"
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import Loading from "../../components/loading/loading";

function Login() {

  let navigate = useNavigate()

  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: ""
  });

  const inputRef = useRef(null)
  const [eyeIsClosed, setEyeIsClosed] = useState(false)

  //function to show and hide password
  const toggleShow = () => {
    if(inputRef.current.type === "password" ){
      setEyeIsClosed(true)
      inputRef.current.type = "text";
    } else{
      setEyeIsClosed(false)
      inputRef.current.type = "password";
    }
  }

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  //function to login
  async function handleSubmit(e) {
    e.preventDefault();

    //Validation with yup for the password and email field
    let schema = yup.object().shape({
      password: yup.string().required("O campo Senha deve ser preenchido"),
      email: yup.string().email().required("O campo E-mail deve ser preenchido")
    })

    try {
      await schema.validate(state)

      const userData = {
        email: state.email,
        password: state.password
      };

      axios.post('http://localhost:8081/login', userData).then((res) => {
        const dataToken = res
        if (dataToken) {
          localStorage.setItem('usertoken', JSON.stringify(dataToken))
          setStatus({
            type: "success"
          })
          setTimeout(() => {
            navigate(`/posts`)
          }, 4000)
        }
      }).catch((err) => {
        let error = JSON.stringify(err.response.data.error)
        setStatus({
          type: "error",
          mensagem: JSON.parse(error)
        })
      });

    } catch (err) {
      setStatus({
        type: "error",
        mensagem: err.errors
      })
    }

  };

  //function to change the background color of the login page 
  useEffect(() => {
    document.body.style.backgroundColor = "#FFFFFF"
  })

  return (
    <>
      {status.type === "success" ? <p>{<Loading />}</p> 
      
      :

        <div className="container-login">

          <h1>Entrar</h1>

          <form className="formulario-login" onSubmit={handleSubmit}>

            <input type="email" name="email" autoComplete="email" value={state.email} placeholder="E-mail" onChange={handleChange} />

            <div className="input-password">
              <input ref={inputRef} type="password" name="password" autoComplete="current-password" value={state.password} placeholder="Senha" onChange={handleChange} />
              <span onClick={toggleShow}>{eyeIsClosed === false ? <RiEyeCloseLine /> : <RiEyeLine/>}</span>
            </div>

            <button type="submit">Entrar</button>

            <p>É novo por aqui? <a href="http://localhost:3000/register"> Cadastre-se</a></p>

          </form>

          {/*validating login errors*/}
          <div className="validação-login">
            {status.type === "error" ? <p style={{ color: "red" }}>{status.mensagem}</p> : ""}
          </div>

        </div>
      }
    </>
  );

};

export default Login;