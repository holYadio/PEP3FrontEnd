import axios from "axios";
import React from "react";
import { useState } from "react";
import { Row,Form, Button } from "react-bootstrap";
import swal from "sweetalert2";
import { CodeBlock, railscast  } from "react-code-blocks";

export default function UploadPreguntaComponent() {
    
    const [pregunta, setPregunta] = useState({
        enunciado: "",
        codigo: "",
        respuesta: "",
        dificultad: "",
    });


    const handleChange = (e) => {
        setPregunta({
            ...pregunta,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (pregunta.dificultad === "") {
            swal.fire({
                title: "Error",
                text: "Selecciona una dificultad",
                icon: "error",
                confirmButtonText: "Aceptar",
                timer: 2000,
            });
            return;
        }
        setPregunta({
            ...pregunta,
            [e.target.name]: e.target.value,
        });
        swal.fire({
            title: "¨¿Desear subir esta pregunta?",
            text: "Se subirá la pregunta al banco de preguntas",
            icon: "question",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Subir",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("http://localhost:8080/pregunta", pregunta)
                swal.fire({
                    title: "Pregunta subida",
                    text: "La pregunta ha sido subida al banco de preguntas",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    timer: 2000,
                }).then((result) => {
                    window.location.href = "/";
                });
            }
        });
    };

    return (
        <body style={{ backgroundColor: "#f7939d" }}>
        <section className="layout3">
            <div className="grow2">
            </div>
            <div className="grow34">
                <br />
                <Row>
                    <h1 className="text-center">Subir Datos del Laboratorio</h1>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="enunciado">
                        <Form.Label><b>Enunciado:</b></Form.Label>
                        <Form.Control
                            type="text"
                            value={pregunta.enunciado}
                            onChange={handleChange}
                            name="enunciado"
                            placeholder="Ingresa el enunciado"
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="codigo">
                        <Form.Label><b>Código:</b></Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={pregunta.codigo}
                            onChange={handleChange}
                            name="codigo"
                            placeholder="Ingresa el código"
                            required
                            />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="vistaPrevia Codigo">
                        <Form.Label><b>Vista previa del código:</b></Form.Label>
                        <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                            <CodeBlock
                                text={pregunta.codigo || "\n \n \n \n"}
                                language="python"
                                theme={	railscast }
                                codeBlock={{ lineNumbers: true }}
                                wrapLines
                                align="left"
                                maxLines={6}
                            />
                        </div>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="respuesta">
                        <Form.Label><b>Respuesta correcta a la pregunta:</b></Form.Label>
                        <Form.Control
                            type="text"
                            value={pregunta.respuesta}
                            onChange={handleChange}
                            name="respuesta"
                            placeholder="Ingresa la respuesta"
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="dificultad">
                    <Form.Label><b>Dificultad de la pregunta:</b></Form.Label>
                    <div className="radio">
                        <Form.Check
                            inline
                            type="radio"
                            label="Básico"
                            name="dificultad"
                            value={0}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Intermedio"
                            name="dificultad"
                            value={1}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Avanzado"
                            name="dificultad"
                            value={2}
                            onChange={handleChange}
                        />
                    </div>
                    <br />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button className="btnPrueba" variant="primary" type="submit">
                        Enviar
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="grow2">
            </div>
        </section>
    </body>
    );
}