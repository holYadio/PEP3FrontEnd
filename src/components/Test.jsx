
import React, { useEffect, useState } from "react";
import { CodeBlock, railscast  } from "react-code-blocks";

export default function TestComponent() {
    const [preguntaActual, setPreguntaActual] = useState(null);
    const [preguntas, setPreguntas] = useState([]);
    useEffect(() => {
        const storedListas = window.localStorage.getItem('preguntas');
        if (storedListas) {
            const parsedListas = JSON.parse(storedListas);
            setPreguntas(parsedListas);
        }
    
        const storedPosicionN = window.localStorage.getItem('preguntaActual');
        if (storedPosicionN) {
            const parsedPosicionN = parseInt(storedPosicionN, 10);
            setPreguntaActual(parsedPosicionN);
        }
    }, []);
    
    const pregunta = preguntas[preguntaActual];
    localStorage.setItem('a', pregunta);
    console.log(preguntaActual);
    console.log(pregunta);

    return (
        <section className="layout2">
            <div className="relleno">1
            </div>
            <div className="pregunta">
                
                    <h3 className="text-enunciado">
                        <b>
                            Pregunta {preguntaActual+1}:
                        </b>
                        <b>
                            {pregunta.enunciado}
                        </b>
                    </h3>
                    <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                        <CodeBlock
                            text={pregunta.codigo}
                            language="python"
                            theme={	railscast }
                            codeBlock={{ lineNumbers: true }}
                            align="left"
                        />
                    </div>
            </div>
            <div className="temporizador">3
            </div>
        </section>
    );
}