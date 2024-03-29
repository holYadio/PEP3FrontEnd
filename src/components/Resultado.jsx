import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
export default function Resultado() {
    const [respuestasCorrectas, setRespuestasCorrectas] = useState([]);
    const [nota,setNota] = useState(0);
    const preguntas = JSON.parse(localStorage.getItem("preguntas"));
    const segundos = parseInt(localStorage.getItem("segundos"));
    const minutos = parseInt(localStorage.getItem("minutos"));
    const horas = parseInt(localStorage.getItem("horas"));

    const promedio = (array) => {
        let suma = 0;
        for (let i = 0; i < array.length; i++) {
            suma += parseInt(array[i]);
        }
        return suma/array.length;
    }

    useEffect(() => {
        const storedResultados = JSON.parse(localStorage.getItem("resultados"));
        if (storedResultados == null) {
            window.location.href = "/";
        }else{
            setRespuestasCorrectas(storedResultados);
            setNota(promedio(storedResultados));
        }

    }, []);

    const handleClick = (e) => {
        Swal.fire({
            title: "¿Deseas volver a inicio?",
            text: "Se borran los resultados",
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                window.location.href = "/";
            }
        });
    };

    const formatoTiempo = valor => {
        return valor < 10 ? `0${valor}` : valor;
    };
    
                
    return (
        <section className="layout3">
            <div className="container">
                <Row>
                    <Col>
                        <Row>
                            <h2>
                                Respuestas Correctas:
                            </h2>
                        </Row>
                        {respuestasCorrectas.map((respuesta, index) => (
                            <Row key={index}>
                                <h2>
                                    <div className="resultados">
                                        <p>
                                            {index + 1}.{" "}{preguntas[index].respuesta}{" "}
                                            {respuesta === 7 ? (
                                                <span className="text-green">&#10004;</span>
                                            ) : (
                                                <span className="text-red">&#10006;</span>
                                            )}
                                        </p>
                                    </div>
                                </h2>
                            </Row>
                        ))}
                    </Col>
                    <Col>
                        <Row>
                            <h2>
                                Nota:
                                {nota >=4 ? (
                                    <b> {nota} </b>
                                ) : (
                                    <span className="text-red"> <b>{nota} </b></span>
                                )}
                            </h2>
                            {nota ===7 ? (
                                <h2>
                                    Felicidades, aprobaste el test
                                </h2>
                            ) : (
                                <h2>
                                    ¡Puedes mejorar! Sigue intentandolo.
                                </h2>
                                )
                            }
                        </Row>
                        <br />
                        <br />
                        <Row>
                            <h2>
                                Tiempo: {`${formatoTiempo(horas)}:${formatoTiempo(minutos)}:${formatoTiempo(segundos)}`} 
                            </h2>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <div className="boton">
                        <Button className='btnPrueba' variant="primary"  onClick={handleClick}>
                            Volver a inicio
                        </Button>
                    </div>
                </Row>
            </div>
        </section>

    );
}