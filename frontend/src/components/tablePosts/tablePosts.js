import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import swal from 'sweetalert'
import './styleTablePosts.scss'

function TablePosts() {
    const [posts, setPosts] = useState([]);
    let navigate = useNavigate()

    //Check if exist token in localStorage
    useEffect(() => {
        if (!localStorage.usertoken) {
            navigate(`/login`)
        }
    })

    //function for delete post with sweetalert for validation
    function deletePost(id) {

        swal({
            title: "Você tem certeza?",
            icon: "warning",
            buttons: ["Cancelar", "Sim, quero deletar!"],
            dangerMode: true,
        }).then((willDelete) => {
                if (willDelete) {
                    if (localStorage.usertoken) {
                        const convertToken = JSON.parse(localStorage.usertoken)
                        axios.delete(`http://localhost:8081/posts/${id}`, {
                            headers: {
                                'Authorization': `token ${convertToken.data.token}`,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }).then((response) => {
                            setPosts(posts.filter(post => post.id !== id))
                            console.log(response);
                            swal("Deletado com sucesso!", {
                                icon: "success",
                            });
                        }).catch((err) => {
                            console.log(err.response)
                        })
                    }
                }
        });
    }

    //function for get posts
    useEffect(() => {
        const convertToken = JSON.parse(localStorage.usertoken)
        axios.get("http://localhost:8081/posts", {
            headers: {
                'Authorization': `token ${convertToken.data.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            setPosts(res.data)
            console.log(res);
        }).catch((err) => {
            console.log(err.response)
        })

    }, [])

    function renderTable() {
        return (
            <table className="table-posts" border="10" frame="void">
                <caption>Posts</caption>   
                <thead>
                    <tr white-space ="pre-wrap">
                        <th>Titulo</th>
                        <th>Descrição</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody white-space ="pre-wrap">
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    function renderRows() {
        return posts.map((post, key) => {
            return (
                <tr key={key} white-space ="pre-wrap">
                    <td >{post.titulo}</td>
                    <td>{post.descricao}</td>
                    <td><center onClick={() => deletePost(post.id)}><FaIcons.FaTrashAlt /></center></td>
                </tr>
            )
        })
    }

    /*function renderRows() {
        return posts.map((post) => {
            return (
                React.Children.toArray(
                    post.posts.map((post, key) => {
                        return (
                            <tr key={key}>
                                <td>{post.titulo}</td>
                                <td>{post.descricao}</td>
                            </tr>
                        )
                    })
                )
            )
        })
    }*/

    return (
        <div>
            <section>
                {renderTable()}
            </section>
        </div>
    )
}

export default TablePosts;