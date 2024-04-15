const casillas = document.querySelectorAll('.casilla');
let jugadorActual = 1; // 1: Jugador 1, 2: Jugador 2
let estadoJuego = ['', '', '', '', '', '', '', '', ''];

casillas.forEach(casilla => {
  casilla.addEventListener('click', () => {
    const celda = parseInt(casilla.dataset.celda);
    marcarCasilla(celda);
  });
});

function marcarCasilla(celda) {
  if (estadoJuego[celda] === '') {
    let simbolo;//crea X u O
    const etiqueta = document.createElement('i'); //crea la etiqueta i que loego se suma la classlist de flaticon.es

    if (jugadorActual === 1) {

      jugadorActual = 2; // Cambia al jugador 2
      simbolo = 'X';
      etiqueta.classList.add('fi', 'fi-rr-cross-circle');//classlist de flaticon.es
    } else {
      jugadorActual = 1; // Cambia al jugador 1
      simbolo = 'O';

      etiqueta.classList.add('fi', 'fi-rr-dot-circle');//classlist de flaticon.es

    }
    estadoJuego[celda] = simbolo;
    casillas[celda].classList.add('jugador' + jugadorActual);
    //casillas[celda].textContent = simbolo;
    casillas[celda].appendChild(etiqueta);
    comprobarGanador();
  }
}

function comprobarGanador() {
  // Líneas horizontales
  for (let i = 0; i < 7; i = i + 3) {
    if (estadoJuego[i] === estadoJuego[i + 1] && estadoJuego[i] === estadoJuego[i + 2] && estadoJuego[i] !== '') {
      alertarGanador(estadoJuego[i]);
      return;
    }
  }

  // Líneas verticales
  for (let i = 0; i < 3; i++) {
    if (estadoJuego[i] === estadoJuego[i + 3] && estadoJuego[i] === estadoJuego[i + 6] && estadoJuego[i] !== '') {
      alertarGanador(estadoJuego[i]);
      return;
    }
  }

  // Diagonales
  if (estadoJuego[0] === estadoJuego[4] && estadoJuego[0] === estadoJuego[8] && estadoJuego[0] !== '') {
    alertarGanador(estadoJuego[0]);
    return;
  }
  if (estadoJuego[2] === estadoJuego[4] && estadoJuego[2] === estadoJuego[6] && estadoJuego[2] !== '') {
    alertarGanador(estadoJuego[2]);
    return;
  }

  // Comprobar empate
  if (!estadoJuego.includes('')) {
    alertarGanador('Nadie');
  }
}

function alertarGanador(ganador) {

  // Bloquear el juego
  const contenedor = document.querySelector('.contenedor');
  contenedor.classList.add('contenedor-deshabilitado'); // Agrega la clase CSS para deshabilitar el contenedor

  // Bloquear el juego
  /*casillas.forEach(casilla => {
      casilla.removeEventListener('click', marcarCasilla); // Eliminar evento click
    });*/
  /*alert('¡Ganó el Jugador ' + ganador + '!');*/

  const mensajeGanador = document.getElementById('mensaje-ganador');
  mensajeGanador.textContent = '¡' + ganador + ' ha ganado!';
  mensajeGanador.style.display = 'block'; // Mostrar el mensaje

  const botonReiniciar = document.getElementById('boton-reiniciar');//boton reiniciar juego
  botonReiniciar.style.display = 'block'; // Mostrar el botón
  botonReiniciar.addEventListener('click', reiniciarJuego);
}

function reiniciarJuego() {
  // Reiniciar variables de estado del juego
  jugadorActual = 1;
  estadoJuego = ['', '', '', '', '', '', '', '', ''];

  // Limpiar el tablero (quitar las X y O)
  casillas.forEach(casilla => {
    casilla.classList.remove('jugador1');
    casilla.classList.remove('jugador2');
    casilla.textContent = '';
  });

  // Ocultar el mensaje y el botón
  const mensajeGanador = document.getElementById('mensaje-ganador');
  mensajeGanador.style.display = 'none';
  const botonReiniciar = document.getElementById('boton-reiniciar');
  botonReiniciar.style.display = 'none';

  //habilitar el div contenedor
  const contenedor = document.querySelector('.contenedor');
  contenedor.classList.remove('contenedor-deshabilitado');
}
