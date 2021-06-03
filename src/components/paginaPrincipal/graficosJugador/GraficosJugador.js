import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Chart } from "react-google-charts";
import axios from 'axios'
import './GraficosJugador.css'


export default class paginaParaGraficos extends Component {

    state = {}

    constructor() {
        super();

        this.state = {
            totalPartidas: 0,
            puntajeTotal: 0,
            partidasGanadas: 0,
            minutosJugados: 0,
            segundosJugados: 0,
            jugadoresConectados: 0,
            tablaPuntajes: [],

            puntuacionJugadores: [],

            graficaPuntuacionJugadores: [],
            graficaCorreoJugadores: []
        }

        setInterval(() => {
            this.consultarDatos();
        }, 10000);
    }
    async consultarDatos() {
        //aquí van las actualizaciones
        const res = await axios.get('https://serverpacmanpage.herokuapp.com/server/Puntaje');
        this.top10JugadoresInfo(res.data);
        this.jugadoresConectadosTiempoReal();
        this.infoTarjetaJugador(res.data);
    }

    async jugadoresConectadosTiempoReal() {
        const res = await axios.get('https://serverpacmanpage.herokuapp.com/server/users');
        this.state.jugadoresConectados = 0;
        //console.log(document.getElementById("playersConnected"));  
        for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].usuario_conectado == "true") {
                this.state.jugadoresConectados = this.state.jugadoresConectados + 1;
            }
        }
        const num_jugadopres_conectados = <h5 className='jugadoresConectadosDatos'>Jugadores conectados:&nbsp; {this.state.jugadoresConectados}</h5>;
        ReactDOM.render(num_jugadopres_conectados, document.getElementById("playersConnected"));
    }

    infoTarjetaJugador(data){
        var puntaje = "";
        var elementosHTML = [];
        for(let i = 0; i < data.length; i++){
            if(data[i]._id == localStorage.getItem("correo")){
                puntaje = data[i].puntuacion;
            }
        }

        const mejorPuntaje = <h5> Tu mejor puntaje es: {puntaje} </h5>;
        var segundos = (parseInt(puntaje)/10)/2;
        const minutos = segundos/60;
        elementosHTML.push(mejorPuntaje);
        if(minutos >= 1){
            segundos = segundos - (60*minutos);
            const minutosMejorPuntaje = <h5>tu mejor tiempo es: {minutos} minutos con {segundos} segundos</h5>
            elementosHTML.push(minutosMejorPuntaje);
        }else{
            const minutosMejorPuntaje = <h5>tu mejor tiempo son: {segundos} segundos</h5>
            elementosHTML.push(minutosMejorPuntaje);
        }
        ReactDOM.render(elementosHTML, document.getElementById("tarjetaInfo"));
    }


    top10JugadoresInfo(data) {
        this.state.puntuacionJugadores = [];
        this.state.correoMejorPuntuacionJugadores = [];

        for (let i = 0; i < data.length; i++) {
            const posiciones = {
                correo: data[i]._id,
                puntuacion: parseInt(data[i].puntuacion)
            }
            this.state.puntuacionJugadores.push(posiciones);
        }

        this.state.puntuacionJugadores.sort((a, b) => b.puntuacion - a.puntuacion);

        //Mostrar los datos en pantalla
        var elementosHTML = [];

        const tr_inicial = <tr></tr>;
        const th_posicion = <th>Posición</th>;
        const th_correo = <th>Correo</th>;
        const th_puntaje = <th>Puntaje</th>;
        elementosHTML.push(tr_inicial);
        elementosHTML.push(th_posicion);
        elementosHTML.push(th_correo);
        elementosHTML.push(th_puntaje);

        for (let i = 0; i < this.state.puntuacionJugadores.length; i++) {

            if (i < 10) {
                const my_tr = <tr id="tr_top"></tr>;
                elementosHTML.push(my_tr);
                //ReactDOM.render(my_tr, document.getElementById("tablaMejoresJugadores"));
                const my_th01 = <th id="th_top01">{i + 1}</th>
                const my_th02 = <th id="th_top02">{this.state.puntuacionJugadores[i].correo}</th>
                const my_th03 = <th id="th_top03">{this.state.puntuacionJugadores[i].puntuacion}</th>
                elementosHTML.push(my_th01);
                elementosHTML.push(my_th02);
                elementosHTML.push(my_th03);
                //ReactDOM.render(my_th01, document.getElementById("tr_top"));
                //ReactDOM.render(my_th02, document.getElementById("tr_top"));
                //ReactDOM.render(my_th03, document.getElementById("tr_top"));
            }
        }
        ReactDOM.render(elementosHTML, document.getElementById("tablaMejoresJugadores"));
    }

    totalPartidasJugador() {

        return (


            <h5>
                Tu total de partidas jugadas es:&nbsp;
                {this.state.totalPartidas}
            </h5>)
    }


    jugadoresConectados() {
        return (

            <div id="playersConnected">
            </div>
        )
    }
    puntajeTotalJugador() {
        return (
            <h5>
                Tu mejor puntaje es: &nbsp;
                {this.state.puntajeTotal}
            </h5>)

    }

    tiempoJugado() {

        return (
            <h5>
                Haz jugado {this.state.minutosJugados} minutos y {this.state.segundosJugados} segundos

            </h5>)
    }

    render() {

        const totalPartidasAux = this.totalPartidasJugador();
        const jugadoresConectadosAux = this.jugadoresConectados();
        const puntajeTotalJugadorAux = this.puntajeTotalJugador();
        const tiempoJugadoAux = this.tiempoJugado();
        return (
            <div className="div">
                <div className="card">
                    <div className="card-header" >
                        <h5 className="card-title">Tus estadisticas </h5>
                    </div>
                    <div className="row mx-auto">

                        <div className="col-sm-6">
                            <br />
                            <div className="card">
                                <div align='center' className="card-body">
                                    <h2>
                                        Bienvenid@ {localStorage.getItem("nombre")}
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <br />
                            <div className="card">
                                <br />
                                {jugadoresConectadosAux}
                            </div>
                            <div className="card">
                                <div className="card-body" id="tarjetaInfo">
                                    {puntajeTotalJugadorAux}
                                    {tiempoJugadoAux}
                                    {totalPartidasAux}
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div align='center' className='top10Jugadores'>
                        <h2>
                            Top 10 jugadores
                        </h2>
                        <table className='tablaPuntajes'>
                            <thead>
                                <div id="tablaMejoresJugadores">
                                </div>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                </div>
            </div>

        );
    }
}
