import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2';
export default function HomeComponent() {
    const handleBottonClick = (dificultad) => {
        localStorage.setItem('dificultad', dificultad.toString());
        localStorage.setItem('preguntaActual', '0');
        axios.get("http://localhost:8080/pregunta/test/"+dificultad).then((response) => {
            console.log(response.data);
            if(response.data != null && response.data.length === 4){
                localStorage.setItem('preguntas', JSON.stringify(response.data));
                localStorage.setItem('pregunta', JSON.stringify(response.data[0]));
                localStorage.setItem('respuestas',JSON.stringify(["","","",""]));
                localStorage.setItem('segundos', '0');
                localStorage.setItem('minutos', '0');
                localStorage.setItem('horas', '0');
                window.location.href = '/question1';
            }else{
                Swal.fire({
                    title: 'Error',
                    text: 'No hay preguntas suficientes para esta dificultad',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    timer: 2000
                });
                return;
            }
        });
    };

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <section className="layout">
            <div className="prueba">
                <div className="textoPrueba">
                    <h1 className='tituloPrueba'>Prueba</h1>
                    <p className='cuerpoPrueba'>
                        Prueba a realizar un test para comprobar cuanto sabes sobre python.
                        El test consta de 4 preguntas de diferentes dificultades, al finalizar el test
                        se te mostrara el resultado obtenido.
                    </p>
                </div>
                <div className="botonesPrueba">
                    <h2 className='tituloDificultad'>Selecciona la dificultad</h2>
                    <Button className='btnPrueba' variant="primary" onClick={() => handleBottonClick(0)}>Básico</Button>
                    <Button className='btnPrueba' variant="primary" onClick={() => handleBottonClick(1)}>Intermedio</Button>
                    <Button className='btnPrueba' variant="primary" onClick={() => handleBottonClick(2)}>Avanzado</Button>
                </div>
            </div>
            <div className="subir">
                <div className="botonSubir">
                    <Button className='btnSubir' variant="primary" href='upload'>Subir Pregunta</Button>
                </div>
                <div className="textoSubir">
                    <h1 className='tituloSubir'> <b>Subir Pregunta </b></h1>
                    <p  className='cuerpoSubir'>
                        ¿Has creado un pregunta y quieres ver como otros se enfrentan a el?
                        Accede a esta opción para agregar una nueva pregunta.</p>
                </div>
            </div>
        </section>
    );
};