const palabras = document.querySelectorAll('.palabra');
const categorias = document.querySelectorAll('.categoria');
const validarBtn = document.getElementById('validar');
const resultado = document.getElementById('resultado');

const respuestasCorrectas = {
    Manzana: 'Frutas',
    Perro: 'Animales',
    Rojo: 'Colores',
    Azul: 'Colores',
    Gato: 'Animales',
    Naranja: 'Frutas',
};
palabras.forEach(palabra => {
    palabra.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
    });
});

categorias.forEach(categoria => {
    categoria.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    categoria.addEventListener('drop', (e) => {
        e.preventDefault();
        const palabraId = e.dataTransfer.getData('text/plain');
        const palabraElement = document.getElementById(palabraId);
        
        if (palabraElement) {
            categoria.appendChild(palabraElement);
        }
    });
});

validarBtn.addEventListener('click', () => {
    let correctas = 0;
    palabras.forEach(palabra => {
        const categoria = palabra.parentElement.getAttribute('data-categoria');
        const texto = palabra.textContent;

        if (respuestasCorrectas[texto] === categoria) {
            palabra.classList.add('correcta');
            palabra.classList.remove('incorrecta');
            correctas++;
        } else {
            palabra.classList.add('incorrecta');
            palabra.classList.remove('correcta');
        }
    });

    if (correctas === palabras.length) {
        resultado.textContent = '¡Felicidades! Todas las palabras están correctamente clasificadas.';
    } else {
        resultado.textContent = `Clasificaste correctamente ${correctas} de ${palabras.length} palabras. ¡Intenta de nuevo!`;
    }
});