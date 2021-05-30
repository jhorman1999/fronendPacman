import React, { Component } from 'react'

import axios from 'axios'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';


export default class login extends Component {
    state = {
        correo: '',
        password: ''
    }

    constructor() {
        super();
        this.state = {
            logueado: false
        }
        if(localStorage.getItem("correo") != undefined){
            this.state.logueado = true;
        }
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        var correo = document.getElementById("correoUsuario").value;
        var contra = document.getElementById("contraseña").value;
        console.log("Tengo: " + correo + "  cs " + contra);
        const res = await axios.get('https://serverpacmanpage.herokuapp.com/server/users');


        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i]._id == correo && res.data[i].pass == contra) {
                localStorage.setItem('correo', correo);
                localStorage.setItem('nombre', res.data[i].nombre);
                localStorage.setItem('pass', res.data[i].pass);
                localStorage.setItem('tipoDeUser', res.data[i].user_type);
                localStorage.setItem('ubicacion', "calle 21 Miami");
                res.data[i].usuario_conectado = "true";
                this.setState({ logueado: true });
                this.actualizarEstadoJugador(res.data[i]);
            } else {
                await swal({
                    title: "El correo o la contraseña son incorrectos",
                    text: "Vuelve a intentarlo otra vez",
                    icon: "warning",
                    timer: "4000"
                });
                this.setState({ logueado: false });
            }
        }
    }

    actualizarEstadoJugador(data){
        var direccion = 'https://serverpacmanpage.herokuapp.com/server/users';
        fetch(direccion + '/' + localStorage.getItem("correo"), {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                window.alert("Inicio de sesión efectuado");
            })
            .catch(err => window.alert("Lo sentimos, algo falló. Comprueba y vuelve a intentar"));
    }



    render(

    ) {
        return (

            <div>


                <div className="card card-body col-md-6 offset-md-3">
                    <h3>
                        Login
                    </h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group" >
                            <input type="email" placeholder="correo" required className="form-control"
                                name="correo" onChange={this.onInputChange} value={this.state.correo} id="correoUsuario" />
                        </div>

                        <div className="form-group" >
                            <input type="password" placeholder="contraseña" required className="form-control" id="contraseña"
                                name="password" onChange={this.onInputChange} value={this.state.password} autoComplete="nope"
                            />
                        </div>
                        {!this.state.logueado && <button type="submit" className="btn btn-primary">
                            ingresar
                        </button>}

                        {this.state.logueado && <Link className="btn btn-lg btn-primary" aria-current="page" to="/paginaPrincipalJugador"> Quiero Jugar </Link>}

                    </form>
                </div>
            </div>
        )
    }
}
