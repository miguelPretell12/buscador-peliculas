const listadoPeli = document.querySelector('.listado-cliente');
const formulario = document.querySelector('#formulario');

document.addEventListener('DOMContentLoaded',()=>{
    formulario.addEventListener('submit', validarFormulario);
});

//Funciones

function validarFormulario(e){
    e.preventDefault();
    const buscarText = document.querySelector('#buscar').value;

    if(buscarText === ''){
        mostrarAlerta('Llenar el campo requerido');
        return;
    }
    listarPeli();
}

function mostrarAlerta(mgs){
    swal({
        text: mgs,
        icon: "error"
    });  
}

function mostrarSpinner(){
    while(listadoPeli.firstChild){
        listadoPeli.removeChild(listadoPeli.firstChild);
    }
    const spinner = document.createElement('div');
    spinner.classList.add('sk-chase','flex-center');

    spinner.innerHTML = `
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
    `;

    listadoPeli.appendChild(spinner);
}

function listarPeli(){
    const textTermino = document.querySelector('#buscar').value;
    mostrarSpinner();
    const url = `https://www.omdbapi.com/?apikey=45b5eb40&s=${textTermino}`;
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => {
        // console.log(resultado.Search);
        mostrarPeli(resultado.Search);
    });
}

function mostrarPeli(peliculas){
    while(listadoPeli.firstChild){
        listadoPeli.removeChild(listadoPeli.firstChild);
    }
    peliculas.forEach(pelicula => {
        const {Poster, imdbID,Title, Year} = pelicula;
       const card = document.createElement('div');
       card.innerHTML = `
            <img src="${Poster}" class="img-flex">
            <div class="flex-absolute">
                <h2 class="text-center">${Title}</h2>
                <p>Año de Lanzamiento: ${Year}</p>
                <a href="detalle.html?id=${imdbID}" target="_blank" class="boton-abs">Ver más</a>
            </div>
       `;
        if(Poster != 'N/A'){
            card.classList.add('flex-30');

            listadoPeli.appendChild(card);
        }else {
            card.classList.add('d-none');
        }
    });
}