import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import * as yup from 'yup';
import "./styleRegister.scss"

function Register() {

    let navigate = useNavigate()

    const [state, setState] = useState({
        first_name: "",
        last_name: "",
        state: "",
        city: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [status, setStatus] = useState({ type: "", mensagem: "" });
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState();

    function handleSelectState(event) {
        setSelectedState(event.target.value);
        handleChange(event)
    }

    function handleChange(e) {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    //function to get the API states
    useEffect(() => {
        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/").then((response) => {
            setUfs(response.data);
        });
    }, [selectedState]);

    //function to get the API citys
    useEffect(() => {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`).then((response) => {
            setCities(response.data);
        });
    });

    //function to register users
    async function handleSubmit(e) {
        e.preventDefault();

        let schema = yup.object().shape({
            confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Erro: Senhas não correspondem'),
            password: yup.string().required("O campo Senha deve ser preenchido")
                .matches(
                    /^(?=.*[A-Z])(?=.*[!#@$%&*])(?=.*[0-9])(?=.*[a-z]).{6,25}$/,
                    "A senha deve conter de 6 a 25 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
                ),
            email: yup.string().email().required("O campo Email deve ser preenchido"),
            city: yup.string().required("O campo Cidade deve ser preenchido"),
            state: yup.string().required("O campo Estado deve ser preenchido"),
            last_name: yup.string().required("O campo Sobrenome deve ser preenchido"),
            first_name: yup.string().required("O campo Nome deve ser preenchido"),
        })

        try {

            await schema.validate(state)

            const userData = {
                first_name: state.first_name,
                last_name: state.last_name,
                state: state.state,
                city: state.city,
                email: state.email,
                password: state.password,
                confirmPassword: state.confirmPassword
            };

            axios.post('http://localhost:8081/register', userData)
                .then((response) => {
                    console.log(response);
                    setStatus({
                        type: "success",
                        mensagem: "Cadastrado com Sucesso"
                    })
                    setTimeout(() => {
                        navigate(`/login`)
                    }, 2000)
                }).catch((err) => {
                    console.log(err.response)
                });

        } catch (err) {
            setStatus({
                type: "error",
                mensagem: err.errors
            })
        }

    };

    //function to change the background color of the register page
    useEffect(() => {
        document.body.style.backgroundColor = "#FFFFFF"
    })

    return (
        <>
            <div className="container-register">
                <h1>Cadastrar</h1>

                <form className="form-register" onSubmit={handleSubmit}>

                    <div className="container-name">
                        <input type="text" name="first_name" placeholder="Nome" value={state.first_name} onChange={handleChange} />
                        <input type="text" name="last_name" placeholder="Sobrenome" value={state.last_name} onChange={handleChange} />

                    </div>

                    <div className="container-select">
                        <select className="select-state" name="state" id="state" onChange={handleSelectState}>
                            <option value="0">Selecione seu estado</option>
                            {ufs.map((uf) => (
                                <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
                            ))}
                        </select>

                        <select className="select-city" name="city" id="city" onChange={handleChange}>
                            <option value="0">Selecione sua cidade</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.nome}>{city.nome}</option>
                            ))}
                        </select>

                    </div>

                    <input type="email" name="email" placeholder="Email" value={state.email} onChange={handleChange} />
                    <input type="password" name="password" placeholder="Senha" value={state.password} onChange={handleChange} />
                    <input type="password" name="confirmPassword" placeholder="Confirmar Senha" value={state.confirmPassword} onChange={handleChange} />

                    <div className="validation-register">
                        {status.type === "success" ? <p style={{ color: "green", marginLeft: "5px" }}>{status.mensagem}</p> : ""}
                        {status.type === "error" ? <p style={{ color: "red", marginLeft: "5px" }}>{status.mensagem}</p> : ""}
                    </div>

                    <button type="submit" >Cadastrar</button>

                    <p>Já se cadastrou?<a href="http://localhost:3000/login"> Entre</a></p>

                </form>

            </div>
        </>
    );
};

export default Register;