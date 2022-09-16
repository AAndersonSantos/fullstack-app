import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios';
import './stylePageCreatePosts.scss'
import NavbarComponent from "../../../components/navbar/navBar";

function CreatePosts() {

    let navigate = useNavigate()

    const [state, setState] = useState({
        titulo: "",
        descricao: "",
        id_user: ""
    });

    //Check if exist token in localStorage
    useEffect(() => {
        if (!localStorage.usertoken) {
            navigate(`/login`)
        }
    })

    function handleChange(e) {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    //function create posts
    function handleSubmit(e) {
        e.preventDefault();

        if (localStorage.usertoken) {
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            const convertToken = JSON.parse(localStorage.usertoken)

            const userData = {
                titulo: state.titulo,
                descricao: state.descricao,
                id_user: decoded.id
            };

            axios.post('http://localhost:8081/posts', userData, {
                headers: {
                    'Authorization': `token ${convertToken.data.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                navigate(`/posts`)
                console.log(response)
            }).catch((err) => {
                console.log(err.response)
            });
        }

    }

    //function to change the background color of the create posts page
    useEffect(() => {
        document.body.style.backgroundColor = "#D3D3D3"
    })

    return (
        <>
            < NavbarComponent />
            <div className="container-create-posts">
                <h1>Cadastrar Post</h1>

                <section>
                    <form onSubmit={handleSubmit} >
                        <input type="text" name="titulo" value={state.titulo} placeholder="Titulo" required onChange={handleChange} />
                        <textarea type="text" name="descricao" value={state.descricao} placeholder="Descrição" required onChange={handleChange} maxLength="200" />
                        <button type="submit" className="btn btn-success">Salvar</button>

                    </form>
                </section>

            </div>
        </>
    )
}

export default CreatePosts;