import React from 'react';
import { Button } from 'react-bootstrap';
export default function HomeComponent() {
    return (
        <div className="home">
            <div className="container">
                <div className="top-section">
                    <Button variant="primary">Básico</Button>
                    <Button variant="primary">Intermedio</Button>
                    <Button variant="primary">Avanzado</Button>
                </div>
                <div className="bottom-section">
                    <Button variant="primary" href='upload'>Subir Pregunta</Button>
                </div>
            </div>
        </div>
    );
};