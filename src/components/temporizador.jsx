import React, { useEffect, useState } from 'react';

const Temporizador = () => {
  const [tiempoInicio, setTiempoInicio] = useState(null);
  const [tiempoFinal, setTiempoFinal] = useState(null);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(null);

  useEffect(() => {
    // Recuperar el tiempo final guardado en el localStorage al cargar el componente
    const storedTiempoFinal = localStorage.getItem('tiempoFinal');
    if (storedTiempoFinal) {
      setTiempoFinal(parseInt(storedTiempoFinal, 10));
    }

    // Iniciar el temporizador al cargar el componente
    iniciarTemporizador();
  }, []);

  useEffect(() => {
    if (tiempoInicio && tiempoFinal) {
      // Calcular el tiempo transcurrido cuando el tiempo de inicio y final están disponibles
      const tiempoTranscurridoMs = tiempoFinal - tiempoInicio;
      setTiempoTranscurrido(tiempoTranscurridoMs);

      // Guardar el tiempo final en el localStorage cada vez que se actualice
      localStorage.setItem('tiempoFinal', tiempoFinal.toString());
    }
  }, [tiempoInicio, tiempoFinal]);

  const iniciarTemporizador = () => {
    setTiempoInicio(new Date());
    setTiempoTranscurrido(null);
  };

  const detenerTemporizador = () => {
    setTiempoFinal(new Date().getTime()); // Establecer el tiempo final actual en milisegundos
  };

  const formatTiempoTranscurrido = (ms) => {
    const segundos = Math.floor(ms / 1000);
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    return `${pad(horas)}:${pad(minutos)}:${pad(segundosRestantes)}`;
  };

  const pad = (numero) => {
    return numero.toString().padStart(2, '0');
  };

  return (
    <div>
      {tiempoFinal && <p>Temporizador iniciado desde {formatTiempoTranscurrido(tiempoFinal)}</p>}
      {tiempoTranscurrido && (
        <p>Tiempo transcurrido: {formatTiempoTranscurrido(tiempoTranscurrido)}</p>
      )}

      <button onClick={detenerTemporizador}>Detener Temporizador</button>
    </div>
  );
};

export default Temporizador;