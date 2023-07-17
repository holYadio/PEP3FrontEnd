import axios from "axios";
import React from "react";
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import swal from "sweetalert2";

export default function UploadPreguntaComponent() {
    const [pregunta, setPregunta] = useState({
        enunciado: "",
        codigo: "",
        respuesta: "",
        dificultad: "",
    })
    const [showError, setShowError] = useState(false)

    const handleChangue = (e) => {
        setPregunta({
            ...pregunta,
            [e.target.name]: e.target.value
        })
    }
    const mostrarAlerta = () => {
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
                window.location.href = "/";
            }
        })
    }

}