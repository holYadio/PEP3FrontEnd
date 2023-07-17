import axios from "axios";
import React from "react";
import { useState } from "react";
import { Row,Form, Button } from "react-bootstrap";
import swal from "sweetalert2";

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
    const handleSubmit = () => {
        swal({
            title: "¿Estás seguro que deseas subir esta pregunta?",
            text: "Una vez subida, no podrás modificarla",
            icon: "warning",
            buttons: ["Cancelar", "Subir"],
        }).then(respuesta => {
            if (respuesta) {
                axios.post("http://localhost:3000/preguntas", pregunta)
                swal({title: "Pregunta subida",
                    text: "La pregunta se ha subido correctamente",
                    icon:"success",
                    timer: "2000"
                });
                console.log(pregunta);
                console.log(respuesta.data);
                console.log(respuesta);
                window.location.href = "/";
            }
        })
    }
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
                            placeholder="Ingresa el enunciado"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="codigo">
                        <Form.Label>Código:</Form.Label>
                        <Form.Control
                            type="text"
                            value={pregunta.codigo}
                            onChange={handleChange}
                            placeholder="Ingresa el código"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="respuesta">
                        <Form.Label>Respuesta correcta a la pregunta:</Form.Label>
                        <Form.Control
                            type="text"
                            value={pregunta.respuesta}
                            onChange={handleChange}
                            placeholder="Ingresa el enunciado"
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
                            checked={pregunta.dificultad === 0}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Intermedio"
                            name="dificultad"
                            value={1}
                            checked={pregunta.dificultad === 1}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Avanzado"
                            name="dificultad"
                            value={2}
                            checked={pregunta.dificultad === 2}
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