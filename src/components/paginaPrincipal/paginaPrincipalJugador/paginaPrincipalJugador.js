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
            if(cancelar == true){
                clearInterval(datos);
            }
        }, 2000);
    }


    simulacionDatos(){
        
        const urlActual = window.location.toString().split("/");
        if(urlActual[urlActual.length-1] == "paginaPrincipalJugador"){
            this.state.puntuacion = 10 + this.state.puntuacion;
            console.log("Puntos: " + this.state.puntuacion);
            return false;
        }else{
            this.subirInfoDB();
            this.state.puntuacion = 0;
            return true;
        }
    }

    async subirInfoDB(){
        const datosRegistro = {
            _id: localStorage.getItem("correo"),
            puntuacion: this.state.puntuacion,
            ubicacion: ""
        };
        //const res = await axios.post('https://serverpacmanpage.herokuapp.com/server/Puntaje/', datosRegistro);
        console.log("Hola, ya llegué");
        const res = await axios.get('https://serverpacmanpage.herokuapp.com/server/Puntaje');
        console.log("Me llegan estos datos: " + res);
        console.log("hago un put ahora jeje");
        const envio = await axios.post('https://serverpacmanpage.herokuapp.com/server/Puntaje/', datosRegistro);
        console.log(envio);
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
                        <iframe src="https://i.simmer.io/@DanielVp/pacmanmultiplayer" style={{width:"960px", height:"600px"}}></iframe>
                    </div>
                </div>

            </div>
        )
    }
}
