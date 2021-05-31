import React, { Component } from 'react'

export default class paginaPrincipal extends Component {

    constructor(props) {
        super(props);
        this.render = this.render.bind(this);

        setInterval(() => {
            this.simulacionDatos();
        }, 2000);
    }


    simulacionDatos(){
        var puntosJugador = 0;
        const urlActual = window.location.toString().split("/");
        if(urlActual[urlActual.length-1] == "paginaPrincipalJugador"){
            puntosJugador += 10;
        }else{
            //subir la data a la db
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
                        <iframe src="https://i.simmer.io/@DanielVp/pacmanmultiplayer" style={{width:"960px", height:"600px"}}></iframe>
                    </div>
                </div>

            </div>
        )
    }
}
