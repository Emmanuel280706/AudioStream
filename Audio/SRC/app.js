// Lista de 10 canciones (Milo J y Taylor Swift)
const canciones = [
    { titulo: "1. M.A.I", artista: "Milo J", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { titulo: "2. Rara Vez", artista: "Milo J", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { titulo: "3. Milagrosa", artista: "Milo J", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { titulo: "4. Fruto", artista: "Milo J", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { titulo: "5. Una Bala", artista: "Milo J", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    { titulo: "6. Cruel Summer", artista: "Taylor Swift", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
    { titulo: "7. Anti-Hero", artista: "Taylor Swift", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
    { titulo: "8. Blank Space", artista: "Taylor Swift", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { titulo: "9. Cardigan", artista: "Taylor Swift", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
    { titulo: "10. Lover", artista: "Taylor Swift", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" }
];

let indiceActual = 0;

// Elementos del DOM
const audio = document.getElementById("reproductor-audio");
const tituloTexto = document.getElementById("titulo-cancion");
const artistaTexto = document.getElementById("artista-cancion");
const contenedorCanciones = document.getElementById("contenedor-canciones");

const btnPlay = document.getElementById("btn-play");
const btnAnterior = document.getElementById("btn-anterior");
const btnSiguiente = document.getElementById("btn-siguiente");
const barraProgreso = document.getElementById("barra-progreso");
const controlVolumen = document.getElementById("control-volumen");

// Generar la lista en el DOM usando etiquetas semánticas (<article>) y Bootstrap (sm, md, lg)
function mostrarLista() {
    contenedorCanciones.innerHTML = "";

    for (let i = 0; i < canciones.length; i++) {
        const articulo = document.createElement("article");
        articulo.className = "col-sm-12 col-md-6 col-lg-6";

        articulo.innerHTML = `
            <section class="p-2 item-cancion" onclick="seleccionarCancion(${i})">
                <strong>${canciones[i].titulo}</strong>
                <p class="m-0 small">${canciones[i].artista}</p>
            </section>
        `;

        contenedorCanciones.appendChild(articulo);
    }
}

// Cargar los datos de la canción actual
function cargarCancion(indice) {
    tituloTexto.textContent = canciones[indice].titulo;
    artistaTexto.textContent = canciones[indice].artista;
    audio.src = canciones[indice].url;
}

// Seleccionar canción desde la lista
function seleccionarCancion(indice) {
    indiceActual = indice;
    cargarCancion(indiceActual);
    audio.play();
}

// Botón Play / Pause
btnPlay.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

// Botón Anterior
btnAnterior.addEventListener("click", function() {
    indiceActual--;
    if (indiceActual < 0) {
        indiceActual = canciones.length - 1;
    }
    cargarCancion(indiceActual);
    audio.play();
});

// Botón Siguiente
btnSiguiente.addEventListener("click", function() {
    indiceActual++;
    if (indiceActual >= canciones.length) {
        indiceActual = 0;
    }
    cargarCancion(indiceActual);
    audio.play();
});

// Actualizar barra de progreso automáticamente
audio.addEventListener("timeupdate", function() {
    if (audio.duration) {
        barraProgreso.value = (audio.currentTime / audio.duration) * 100;
    }
});

// Adelantar o atrasar con la barra de progreso
barraProgreso.addEventListener("input", function() {
    if (audio.duration) {
        audio.currentTime = (barraProgreso.value / 100) * audio.duration;
    }
});

// Control de volumen
controlVolumen.addEventListener("input", function() {
    audio.volume = controlVolumen.value / 100;
});

// Inicializar al cargar la página
mostrarLista();
cargarCancion(indiceActual);
