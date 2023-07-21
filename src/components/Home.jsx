import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2';
export default function HomeComponent() {
    const handleBottonClick = (dificultad) => {
        localStorage.setItem('dificultad', dificultad.toString());
        localStorage.setItem('preguntaActual', '0');
        axios.get("http://localhost:8080/pregunta/test/"+dificultad).then((response) => {
            if(response.data != null && response.data.length === 4){
                localStorage.setItem('preguntas', JSON.stringify(response.data));
                localStorage.setItem('pregunta', JSON.stringify(response.data[0]));
                localStorage.setItem('respuestas',JSON.stringify(["","","",""]));
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
                <Button variant="primary" onClick={() => handleBottonClick(0)}>Básico</Button>
                <Button variant="primary" onClick={() => handleBottonClick(1)}>Intermedio</Button>
                <Button variant="primary" onClick={() => handleBottonClick(2)}>Avanzado</Button>
            </div>
            <div className="subir">
                <Button variant="primary" href='upload'>Subir Pregunta</Button>
            </div>
        </section>
    );
};