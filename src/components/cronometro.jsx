import React, { useEffect, useState } from "react";

export default function CronometroComponent() {
    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [horas, setHoras] = useState(0);
    
    useEffect(() => {
        const cronometroID = setInterval(() => {
            setSegundos(segundos => segundos + 1);
        }, 1000);
    
        return () => {
            clearInterval(cronometroID);
        };
    }, []);
    
    useEffect(() => {
        if (segundos >= 60) {
            setSegundos(0);
            setMinutos(minutos => minutos + 1);
        }
    }, [segundos]);
    
    useEffect(() => {
        if (minutos >= 60) {
            setMinutos(0);
            setHoras(horas => horas + 1);
        }
    }, [minutos]);
    
    useEffect(() => {
        // Guardar tiempo en el localStorage
        localStorage.setItem('tiempoCronometro', JSON.stringify({ horas, minutos, segundos }));
    }, [horas, minutos, segundos]);
    localStorage.setItem("segundos", segundos);
    localStorage.setItem("minutos", minutos);
    localStorage.setItem("horas", horas);
    
    const reiniciarCronometro = () => {
        setSegundos(0);
        setMinutos(0);
        setHoras(0);
        };
    
    const formatoTiempo = valor => {
        return valor < 10 ? `0${valor}` : valor;
    };
    
    return (
        <div>
            <div className='cronometro'>{`${formatoTiempo(horas)}:${formatoTiempo(minutos)}:${formatoTiempo(segundos)}`}</div>
        </div>
        );
}