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
            tablaPuntajes:[],

            puntuacionJugadores: [],

            graficaPuntuacionJugadores: [],
            graficaCorreoJugadores:[]
        }
        
        setInterval(() => {
            this.consultarDatos();
        }, 10000);
    }
    async consultarDatos() {
        //aquí van las actualizaciones
        const res = await axios.get('https://serverpacmanpage.herokuapp.com/server/Puntaje');    
        this.top10JugadoresInfo(res.data);
    }


    top10JugadoresInfo(data){
        this.state.puntuacionJugadores = [];
        this.state.correoMejorPuntuacionJugadores = [];

        for(let i = 0; i < data.length; i++){
            const posiciones = {
                correo: data[i]._id,
                puntuacion: parseInt(data[i].puntuacion)
            }
            this.state.puntuacionJugadores.push(posiciones);
        }
        console.log("Ahora tengo: ");
        
        this.state.puntuacionJugadores.sort((a,b) => b.puntuacion - a.puntuacion);

        //Mostrar los datos en pantalla
        var elementosHTML = [];
        for(let i = 0; i < this.state.puntuacionJugadores.length; i++){
            
            if(i < 10){
                const my_tr = <tr id="tr_top"></tr>;
                console.log("obtn div");
                console.log(document.getElementById("tablaMejoresJugadores"));
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


    graficaPartidas() {
        if (this.state.partidasGanadas === 0) {

            return (
                <div>
                    todavia no has jugado ninguna partida :(
                </div>)
        } else {
            return (
                <div>
                    <Chart
                        width={'1000'}
                        height={'600'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}

                        data={
                            [
                                ['partidas', 'numero de patidas'],
                                ['partidas ganadas', this.state.partidasGanadas],
                                ['partidas perdidas', (this.state.totalPartidas - this.state.partidasGanadas)],

                            ]}
                        options={{
                            title: 'porcentaje de partidas ganadas',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
            )
        }
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

            <div>
                <h5 className='jugadoresConectados'>
                    Jugadores conectados:&nbsp; 
                
                </h5>
                <h5 className='jugadoresConectadosDatos'>{this.state.jugadoresConectados}</h5>
            </div>
            )
    }
    puntajeTotalJugador() {
        return (
            <h5>
                Tu puntaje total es: &nbsp; 
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

        const graficos = this.graficaPartidas();
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
                        <br/>
                            <div className="card">
                                <div align='center' className="card-body">
                                    <h2>
                                        Partidas ganadas vs Partidas Perdidas
                    </h2>
                                    {graficos}
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <br/>
                        <div className="card">
                        <br/>
                        {jugadoresConectadosAux}
                        </div>
                            <div className="card">
                                <div className="card-body">
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
                                <div id = "tablaMejoresJugadores">
                                <tr>
                                    <th>posicion</th>
                                    <th>Correo</th>
                                    <th>Puntaje</th>
                                </tr>
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
