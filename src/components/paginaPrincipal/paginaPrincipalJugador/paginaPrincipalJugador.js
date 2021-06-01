import React, { Component } from 'react'
import axios from 'axios';
export default class paginaPrincipal extends Component {

    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.state = {
            puntuacion: 0
        }

        var datos = setInterval(() => {
            var cancelar = this.simulacionDatos();
            if (cancelar == true) {
                clearInterval(datos);
            }
        }, 2000);
    }


    simulacionDatos() {

        const urlActual = window.location.toString().split("/");
        if (urlActual[urlActual.length - 1] == "paginaPrincipalJugador") {
            this.state.puntuacion = 10 + this.state.puntuacion;
            console.log("Puntos: " + this.state.puntuacion);
            return false;
        } else {
            this.subirInfoDB();
            this.state.puntuacion = 0;
            return true;
        }
    }

    async subirInfoDB() {
        const datosRegistro = {
            _id: localStorage.getItem("correo"),
            puntuacion: this.state.puntuacion.toString(),
            ubicacion: "hola jejeje"
        };
        //const res = await axios.post('https://serverpacmanpage.herokuapp.com/server/Puntaje/', datosRegistro);
        console.log("Hola, ya llegué");
        const direccion = 'https://serverpacmanpage.herokuapp.com/server/Puntaje/' + localStorage.getItem("correo");
        const res = await axios.get(direccion);
        console.log(res.data);
        console.log("hago un put ahora jeje");
        if (res.data == null) {
            //Empujamos la data
            fetch('https://serverpacmanpage.herokuapp.com/server/Puntaje/', {
                method: 'POST',
                body: JSON.stringify(datosRegistro),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'X-PINGOTHER',
                    'Access-Control-Max-Age': '1728000'
                }
            }).then(res => {
                console.log(res)
                window.alert("PuntajeActualizado");
            }).catch(err => window.alert("Lo sentimos, algo falló. Comprueba y vuelve a intentar"));
        } else {
            //Actualizamos la data si la puntuación es mayor
            if (parseInt(datosRegistro.puntuacion) > parseInt(res.data.puntuacion)) {
                fetch('https://serverpacmanpage.herokuapp.com/server/Puntaje/' + localStorage.getItem("correo"), {
                    method: 'PUT',
                    body: JSON.stringify(datosRegistro),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                        'Access-Control-Allow-Headers': 'X-PINGOTHER',
                        'Access-Control-Max-Age': '1728000'
                    }
                }).then(res => {
                    console.log(res)
                    window.alert("PuntajeActualizado");
                }).catch(err => window.alert("Lo sentimos, algo falló. Comprueba y vuelve a intentar"));
            }
            console.log("termino jeje");
        }

    }


    componentDidMount() {
        const correo = localStorage.getItem('correo');
    }
    render() {
        return (
            <div>

                <div className="card">
                    <div className="card-header">

                    </div>
                    <div className="card-body">
                        <iframe src="https://i.simmer.io/@DanielVp/pacmanmultiplayer" style={{ width: "960px", height: "600px" }}></iframe>
                    </div>
                </div>

            </div>
        )
    }
}
