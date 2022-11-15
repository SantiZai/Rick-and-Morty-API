/* Aquí necesitamos traer todos los personajes, por eso
 * importamos nuestra función getCharacters
 */
import { getCharacters } from './services/getData.js';

/**
 * Tomamos el main container de nuestro Home
 */
const container = document.getElementById('characters');
const loader = document.getElementById('lds-ring');

/**
 * Llama a la lista de personajes, recorre el objeto y crea
 * una estructura HTML por cada uno, luego los inyecta
 * de a uno en el container.
 */
// Le pasamos page 1 por defecto por si no lo recibe
const charactersList = async(page = 1) => {
    // Mostramos el loader antes de llamar a la API
    loader.style.display = 'grid';
    // Pedimos los personajes
    const { results } = await getCharacters(page);
    // Ocultamos el loader una vez que tenemos la respuesta
    loader.style.display = 'none';
    // Por cada personaje creamos un article con sus datos
    results.forEach(character => {
        const article = document.createElement('article');
        article.setAttribute('class', 'character');
        article.innerHTML = `
        <img src='${character.image}' alt='' />
        <h2>${character.name}</h2>
        <div>
            <p>${character.species}</p>
            <p class='${character.status.toLowerCase()}'></p>
        </div>
        <a href='/#/${character.id}'>Ver detalle</a>
        `;
        container.appendChild(article);
    })
}


/**
 * Invocamos nuestra función principal
 */
charactersList();

/**
 * Cuando la URL cambie al presionar el enlace
 * de un personaje, el navegador reconoce el evento
 * y guarda el ID de ese personaje en el localStorage
 * para ser tomado por el archivo de details.js
 */
window.addEventListener('hashchange', () => {
    // Si el enlace lleva a /#/3, el id toma el valor 3 que es el ID del personaje
    const id = location.hash.slice(1).toLocaleLowerCase().split('/')[1] || '/';
    localStorage.setItem('charID', id);
    window.location.replace('/character.html');
})