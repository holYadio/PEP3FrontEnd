import axios from "axios";
import React from "react";
import { useState } from "react";
import { Row,Form, Button } from "react-bootstrap";
import swal from "sweetalert2";
import { CodeBlock, 		railscast  } from "react-code-blocks";

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
        <>
            <div>
                <br />
                <Row>
                    <h1 className="text-center">Subir Datos del Laboratorio</h1>
                </Row>
                <br />
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="enunciado">
                    <Form.Label>Enunciado:</Form.Label>
                    <Form.Control
                        type="text"
                        value={pregunta.enunciado}
                        onChange={handleChange}
                        name="enunciado"
                        placeholder="Ingresa el enunciado"
                        required
                    />
                    </Form.Group>
        
                    <Form.Group controlId="codigo">
                        <Form.Label>Código:</Form.Label>
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
                    
                    <Form.Group controlId="vistaPrevia Codigo">
                        <Form.Label>Vista previa del código:</Form.Label>
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

                    <Form.Group controlId="respuesta">
                        <Form.Label>Respuesta correcta a la pregunta:</Form.Label>
                        <Form.Control
                            type="text"
                            value={pregunta.respuesta}
                            onChange={handleChange}
                            name="respuesta"
                            placeholder="Ingresa la respuesta"
                            required
                        />
                    </Form.Group>
        
                    <Form.Group controlId="dificultad">
                    <Form.Label>Dificultad de la pregunta:</Form.Label>
                    <div>
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
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Enviar
                    </Button>
                </Form>
            </div>
        </>
    );
}