// Traemos al personaje solicitado
import { getCharacter } from './services/getData.js';

// Guardamos los elementos del DOM a utilizar
const container = document.getElementById('character');
const loader = document.getElementById('lds-ring');

// Leemos el ID guardado en el localStorage
const getID = localStorage.getItem('charID');

// Creamos la funcion para darle la informacion al HTML
const loadCharacter = async(id) => {
    loader.style.display = 'grid';
    const data = await getCharacter(id);
    loader.style.display = 'none';

    const article = document.createElement('article');
    article.setAttribute('class', 'character');
    article.innerHTML = `
    <img src='${data.image}' alt='' />
    <h2>${data.name}</h2>
    <p class='data'><span>Origen:</span> ${data.origin.main}</p>
    <p class='data'><span>Locación actual:</span> ${data.location.name}</p>
    <div>
        <p class='data'><span>Especie:</span> ${data.especies}</p>
        <p class='${data.status.toLowerCase()}'></p>
    </div>
    `;
    container.appendChild(article);
}

// Llamamos a la funcion creada
loadCharacter(getID)