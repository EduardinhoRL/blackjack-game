let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0,
    puntosComputadora = 0;


// Referencias HTML
const PuntosHTML = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const btnPedir = document.querySelector('#btnPedir');

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle(deck);

}

crearDeck();


const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas disponibles'
    }
    const carta = deck.pop();
    console.log(deck);
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10 :
        valor * 1
}

const valor = valorCarta(pedirCarta());

// Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    PuntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
    } else if (puntosJugador === 21) {
        console.warn('21, Ganaste!!');
        btnPedir.disabled = true;
    }
});

//console.log(pedirCarta());
//console.log(deck);