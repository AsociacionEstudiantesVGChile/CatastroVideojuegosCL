// This file contains the JavaScript code for the website. It includes functionality for the search feature, event listeners, and any interactive elements.

// --- Buscador de videojuegos chilenos ---
const DATA_URL = './videojuegos.json';

let videojuegos = [];
let filtros = {
    anio: '',
    desarrollador: '',
    etiquetas: [],
    texto: '',
    orden: 'az'
};

async function cargarVideojuegos() {
    const response = await fetch(DATA_URL);
    return await response.json();
}

function obtenerEtiquetas(videojuegos) {
    const etiquetas = new Set();
    videojuegos.forEach(j => j.etiquetas.forEach(e => etiquetas.add(e)));
    return Array.from(etiquetas).sort();
}

function obtenerAnios(videojuegos) {
    const anios = new Set(videojuegos.map(j => j.anio));
    return Array.from(anios).sort((a, b) => b - a);
}

function obtenerDesarrolladores(videojuegos) {
    const devs = new Set(videojuegos.map(j => j.desarrollador));
    return Array.from(devs).sort();
}

function renderFiltros(videojuegos) {
    // Etiquetas
    const etiquetas = obtenerEtiquetas(videojuegos);
    const etiquetasDiv = document.getElementById('filtros-etiquetas');
    etiquetasDiv.innerHTML = etiquetas.map(etq =>
        `<label><input type="checkbox" value="${etq}"> ${etq.charAt(0).toUpperCase() + etq.slice(1)}</label>`
    ).join('<br>');

    // Años
    const anios = obtenerAnios(videojuegos);
    const anioSelect = document.getElementById('filtro-anio');
    anioSelect.innerHTML = `<option value="">Todos</option>` +
        anios.map(anio => `<option value="${anio}">${anio}</option>`).join('');

    // Desarrolladores
    const devs = obtenerDesarrolladores(videojuegos);
    const devSelect = document.getElementById('filtro-desarrollador');
    devSelect.innerHTML = `<option value="">Todos</option>` +
        devs.map(dev => `<option value="${dev}">${dev}</option>`).join('');
}

function filtrarYOrdenar() {
    let resultados = videojuegos.filter(juego => {
        // Filtro año
        if (filtros.anio && String(juego.anio) !== filtros.anio) return false;
        // Filtro desarrollador
        if (filtros.desarrollador && juego.desarrollador !== filtros.desarrollador) return false;
        // Filtro etiquetas
        if (filtros.etiquetas.length > 0 && !filtros.etiquetas.every(etq => juego.etiquetas.includes(etq))) return false;
        // Filtro texto
        if (filtros.texto) {
            const texto = filtros.texto.toLowerCase();
            if (!juego.titulo.toLowerCase().includes(texto) && !juego.descripcion.toLowerCase().includes(texto)) return false;
        }
        return true;
    });

    // Ordenar
    switch (filtros.orden) {
        case 'az':
            resultados.sort((a, b) => a.titulo.localeCompare(b.titulo));
            break;
        case 'za':
            resultados.sort((a, b) => b.titulo.localeCompare(a.titulo));
            break;
        case 'anio-desc':
            resultados.sort((a, b) => b.anio - a.anio);
            break;
        case 'anio-asc':
            resultados.sort((a, b) => a.anio - b.anio);
            break;
    }

    mostrarResultados(resultados);
}

function mostrarResultados(resultados) {
    const contenedor = document.getElementById('search-results');
    if (!resultados.length) {
        contenedor.innerHTML = "<p>No se encontraron videojuegos.</p>";
        return;
    }
    contenedor.innerHTML = resultados.map(juego => `
        <div class="juego-card">
            <h3>${juego.titulo}</h3>
            <p>${juego.descripcion}</p>
            <p><strong>Etiquetas:</strong> ${juego.etiquetas.join(', ')}</p>
            <p><strong>Año:</strong> ${juego.anio}</p>
            <p><strong>Desarrollador:</strong> ${juego.desarrollador}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
    // Solo inicializar si existe el buscador
    if (!document.getElementById('search-results')) return;

    videojuegos = await cargarVideojuegos();
    renderFiltros(videojuegos);
    filtrarYOrdenar();

    // Filtros
    document.getElementById('filtros-form').addEventListener('change', e => {
        filtros.anio = document.getElementById('filtro-anio').value;
        filtros.desarrollador = document.getElementById('filtro-desarrollador').value;
        filtros.etiquetas = Array.from(document.querySelectorAll('#filtros-etiquetas input:checked')).map(cb => cb.value);
        filtrarYOrdenar();
    });

    // Ordenar
    document.getElementById('ordenar-select').addEventListener('change', e => {
        filtros.orden = e.target.value;
        filtrarYOrdenar();
    });

    // Búsqueda por texto
    document.getElementById('search-input').addEventListener('input', e => {
        filtros.texto = e.target.value;
        filtrarYOrdenar();
    });
});

// Carrusel de noticias recientes
document.addEventListener('DOMContentLoaded', function() {
    const paneles = document.querySelectorAll('.noticia-panel');
    const prevBtn = document.getElementById('prevNoticia');
    const nextBtn = document.getElementById('nextNoticia');
    const visibles = 3;
    let inicio = 0;

    function mostrarPaneles() {
        paneles.forEach((panel, idx) => {
            if (idx >= inicio && idx < inicio + visibles) {
                panel.style.display = 'block';
            } else {
                panel.style.display = 'none';
            }
        });
    }

    if (prevBtn && nextBtn && paneles.length > 0) {
        prevBtn.addEventListener('click', () => {
            if (inicio > 0) {
                inicio--;
                mostrarPaneles();
            }
        });
        nextBtn.addEventListener('click', () => {
            if (inicio < paneles.length - visibles) {
                inicio++;
                mostrarPaneles();
            }
        });
        mostrarPaneles();
    }
});