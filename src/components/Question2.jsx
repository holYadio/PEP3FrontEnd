import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { CodeBlock, railscast  } from "react-code-blocks";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'; 

export default function Question2() {
    const initialState = {
        answer: localStorage.getItem("respuestas") ? JSON.parse(localStorage.getItem("respuestas"))[1] : "",
    }
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [pregunta, setPregunta] = useState(null);
    const [respuesta,setRespuesta] = useState(initialState);
    const resultados = [0,0,0,0];
    const navigate  = useNavigate();

    useEffect(() => {
        const storedPreguntas = JSON.parse(localStorage.getItem("preguntas"));
        if (storedPreguntas == null) {
            window.location.href = "/";
        }
        const storedPreguntaActual = parseInt(localStorage.getItem("preguntaActual"));
        if (storedPreguntaActual === 1) {
            setPreguntaActual(storedPreguntaActual);
        }else{
            navigate(-1);
        }
        const storedPregunta = JSON.parse(localStorage.getItem("pregunta"));
        if (storedPregunta != null) {
            setPregunta(storedPregunta);
        }

        const handleBeforeUnload = (event) => {
            // Verificar si la URL de destino es "/"
            const nextURL = event.currentTarget.location.href;
            const rootURL = `${window.location.protocol}//${window.location.host}/`;
            if (nextURL === rootURL) {
                // Mostrar una alerta de confirmación con SweetAlert2
                event.preventDefault();
                event.returnValue = ""; // Este mensaje no se mostrará en navegadores modernos, pero es necesario para navegadores más antiguos
            
                Swal.fire({
                    title: "¿Estás seguro que deseas salir?",
                    text: "Los cambios no guardados se perderán.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Salir",
                    cancelButtonText: "Cancelar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Si el usuario confirma la salida, continúa con la acción de cambio de dirección
                        window.removeEventListener("beforeunload", handleBeforeUnload);
                        // Aquí puedes redirigir a la nueva dirección utilizando react-router o window.location.href
                    } else {
                        // Si el usuario cancela la salida, se queda en la página actual
                        return false;
                    }
                });
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [navigate]);
    
    const handleChange = (e) => {
        setRespuesta({
            ...respuesta,
            answer: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setRespuesta({
            ...respuesta,
            [e.target.name]: e.target.value,
        });
        const respuestas = JSON.parse(localStorage.getItem("respuestas"));
        respuestas[preguntaActual] = respuesta.answer;
        localStorage.setItem("respuestas", JSON.stringify(respuestas));
        Swal.fire({
            title: "¿Desear enviar la prueba?",
            text: "Se enviará la prueba y se mostrará el resultado",
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Enviar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                const storedPreguntas = JSON.parse(localStorage.getItem("preguntas"));
                const storedRespuestas = JSON.parse(localStorage.getItem("respuestas"));
                for (let i = 0; i < storedRespuestas.length; i++) {
                    if (storedRespuestas[i] === storedPreguntas[i].respuesta) {
                        resultados[i] = 7;
                    }else{
                        resultados[i] = 1;
                    }
                }
                localStorage.setItem("resultados", JSON.stringify(resultados));
                window.location.href = "/resultado";

            }
        });
    };
    
    const handleButton = (e,numPregunta) => {
        e.preventDefault();
        setRespuesta({
            ...respuesta,
            [e.target.name]: e.target.value,
        });
        const respuestas = JSON.parse(localStorage.getItem("respuestas"));
        respuestas[preguntaActual] = respuesta.answer;
        localStorage.setItem("respuestas", JSON.stringify(respuestas));
        const preguntas = JSON.parse(localStorage.getItem("preguntas"));
        localStorage.setItem("preguntaActual", numPregunta);
        localStorage.setItem("pregunta", JSON.stringify(preguntas[numPregunta]));
        window.location.href = "/question"+(numPregunta+1);
    };

    return (
        <div>
            {pregunta ? (
                <section className="layout3">
                    <div className="grow2">
                    </div>
                    <div className="grow34">
                        <br />
                        <h4 className="text-enunciado">
                            <b>
                                Pregunta {preguntaActual+1}:
                            </b>
                            
                            {pregunta.enunciado}
                            
                        </h4>
                        <br />
                        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                            <CodeBlock
                                text={pregunta.codigo}
                                language="python"
                                theme={	railscast }
                                codeBlock={{ lineNumbers: true }}
                                align="left"
                            />
                        </div>
                        <div className="respuesta">
                            <Form onSubmit={handleSubmit}>
                                <br />  
                                <Form.Group controlId="respuesta">
                                    <Form.Label> Respuesta:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={respuesta.answer !== "" ? respuesta.answer : ""}
                                        onChange={handleChange}
                                        name="answer"
                                        placeholder="Ingrese su respuesta aquí"
                                        />
                                </Form.Group>
                                <br />
                                <div className="boton">
                                    <Button className="botonesPreguntaAbajo" variant="primary" onClick={(e) => handleButton(e,0)}>
                                        Anterior
                                    </Button>
                                    <Button className="botonesPregunta" variant="primary" onClick={(e) => handleButton(e,2)}>
                                        Siguiente
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="grow1">
                        <div >
                            <p>
                                Preguntas:
                            </p>
                            <div>
                                <Button className="botonesPregunta" variant="primary" onClick={(e) => handleButton(e,0)}>
                                    1
                                </Button>

                                <Button className="botonesPregunta" variant="primary" onClick={(e) => handleButton(e,1)}>
                                    2
                                </Button>
                            </div>
                            <div>
                                <Button className="botonesPregunta" variant="primary" onClick={(e) => handleButton(e,2)}>
                                    3
                                </Button>

                                <Button className="botonesPregunta" variant="primary" onClick={(e) => handleButton(e,3)}>
                                    4
                                </Button>
                            </div>
                        </div>
                        <div className="cronometro">
                            <p>
                                Tiempo:
                            </p>
                        </div>
                        <div>
                            <Button className="botonesPregunta" variant="primary" onClick={(e) => handleSubmit(e)}>
                                Terminar Intento
                            </Button>
                        </div>
                    </div>
                </section>
            ) : (
                <div>
                    <h2>
                        Cargando datos ....
                    </h2>
                </div>
            )}
        </div>
    );
}