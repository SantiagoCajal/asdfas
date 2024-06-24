// Definimos la clase Tema
class Tema {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}

// Definimos la clase Pregunta
class Pregunta {
    constructor(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema) {
        this.texto = texto;
        this.respuestaCorrecta = respuestaCorrecta;
        this.respuestasIncorrectas = respuestasIncorrectas;
        this.nivel = nivel;
        this.tema = tema;
    }
}

// Array para almacenar los temas
var temas = [];
// Array para almacenar las preguntas
var preguntas = [];

// Función para crear un nuevo tema
function crearTema(nombre, descripcion) {
    // Verificar si el tema ya existe
    let temaExistente = temas.find(tema => tema.nombre === nombre);
    
    if (temaExistente) {
        return "El tema ya existe";
    } else {
        // Crear una nueva instancia de Tema
        let nuevoTema = new Tema(nombre, descripcion);
        // Agregar el nuevo tema al array de temas
        temas.push(nuevoTema);
		
// Actualizar la lista de temas y el contador de temas
actualizarListaYContadorTemas();
// Actualizar opciones de temas en el formulario de preguntas
actualizarOpcionesTemas();
// Actualizar el promedio de preguntas por tema
actualizarPromedioPreguntas();
        actualizarTemasSinPreguntas();		
        return nuevoTema;
    }
}

// Función para crear una nueva pregunta
function crearPregunta(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema) {
    // Verificar si ya existe una pregunta con el mismo texto
    let preguntaExistente = preguntas.find(p => p.texto === texto);

    if (preguntaExistente) {
        return "Ya existe una pregunta con ese texto";
    }

    // Verificar si el tema existe
    let temaExistente = temas.find(t => t.nombre === tema);

    if (!temaExistente) {
        return "El tema no existe";
    }

    // Verificar que el nivel esté entre 1 y 5
    if (nivel < 1 || nivel > 5) {
        return "El nivel debe estar entre 1 y 5";
    }

    // Verificar que la respuesta correcta no esté entre las respuestas incorrectas
    let respuestasIncorrectasArray = respuestasIncorrectas.split(",").map(r => r.trim());
    if (respuestasIncorrectasArray.includes(respuestaCorrecta)) {
        return "La respuesta correcta no puede estar entre las respuestas incorrectas";
    }

    // Crear una nueva instancia de Pregunta
    let nuevaPregunta = new Pregunta(texto, respuestaCorrecta, respuestasIncorrectasArray, nivel, tema);
    // Agregar la nueva pregunta al array de preguntas
    preguntas.push(nuevaPregunta);


// Actualizar el promedio de preguntas por tema
actualizarPromedioPreguntas();
actualizarTemasSinPreguntas();
    // Devolver la pregunta creada (opcional)
    return nuevaPregunta;
}

// Función para actualizar la lista de temas y el contador de temas
function actualizarListaYContadorTemas() {
    // Actualizamos la lista de temas
    actualizarListaTemas();
    // Actualizamos el contador de temas
    actualizarContadorTemas();
}

// Función para actualizar la lista de nombres de temas
function actualizarListaTemas() {
    var listaTemasElemento = document.getElementById('listaTemas');
    // Limpiamos la lista antes de agregar los nuevos temas
    listaTemasElemento.innerHTML = '';
    // Recorremos el array de temas y agregamos cada nombre a la lista
    temas.forEach(function(tema) {
        var li = document.createElement('li');
        li.textContent = tema.nombre;
        listaTemasElemento.appendChild(li);
    });

    // Si no hay temas, agregamos un elemento de "Sin datos"
    if (temas.length === 0) {
        var li = document.createElement('li');
        li.textContent = 'Sin datos';
        listaTemasElemento.appendChild(li);
    }
}

// Función para actualizar el contador de temas
function actualizarContadorTemas() {
    var contadorElemento = document.getElementById('contadorTemas');
    contadorElemento.textContent = Lista de temas (total de temas: ${temas.length});
}

// Función para actualizar las opciones del select de temas en el formulario de preguntas
function actualizarOpcionesTemas() {
    var selectTemas = document.getElementById('idTemas');
    // Limpiamos las opciones existentes
    selectTemas.innerHTML = '';

    // Creamos y añadimos una opción por cada tema en el array de temas
    temas.forEach(function(tema) {
        var option = document.createElement('option');
        option.value = tema.nombre;
        option.textContent = tema.nombre;
        selectTemas.appendChild(option);
    });

    // Si no hay temas, agregamos una opción predeterminada
    if (temas.length === 0) {
        var option = document.createElement('option');
        option.textContent = 'No hay temas disponibles';
        selectTemas.appendChild(option);
    }
}

// Función para actualizar la tabla de preguntas
function actualizarTablaPreguntas() {
    var tablaPreguntasBody = document.getElementById('tablaPreguntasBody');
    // Limpiamos el cuerpo de la tabla antes de agregar las nuevas filas
    tablaPreguntasBody.innerHTML = '';

    // Recorremos el array de preguntas y agregamos cada pregunta a la tabla
    preguntas.forEach(function(pregunta) {
        var row = document.createElement('tr');
        row.innerHTML = 
            <td>${pregunta.tema}</td>
            <td>${pregunta.nivel}</td>
            <td class="columna-larga1">${pregunta.texto}</td>
            <td class="columna-larga2">${pregunta.respuestaCorrecta}</td>
            <td class="columna-larga3">${pregunta.respuestasIncorrectas.join(', ')}</td>
        ;
        tablaPreguntasBody.appendChild(row);
    });

    // Si no hay preguntas, agregamos una fila indicando que no hay datos
    if (preguntas.length === 0) {
        var row = document.createElement('tr');
        row.innerHTML = '<td colspan="5">Sin datos</td>';
        tablaPreguntasBody.appendChild(row);
    }
}

function actualizarPromedioPreguntas() {
    var promedioElemento = document.getElementById('promedioPreguntas');
    if (temas.length === 0) {
        promedioElemento.textContent = 'Promedio de preguntas por tema (cantidad total de preguntas/cantidad total de temas): sin datos';
    } else {
        var promedio = (preguntas.length / temas.length).toFixed(2);
        promedioElemento.textContent = Promedio de preguntas por tema (cantidad total de preguntas/cantidad total de temas): ${promedio};
    }
}

function actualizarTemasSinPreguntas() {
    var temasSinPreguntas = temas.filter(function(tema) {
        return !preguntas.some(function(pregunta) {
            return pregunta.tema === tema.nombre;
        });
    });

    var listaTemasSinPreguntasElemento = document.getElementById('listaTemasSinPreguntas');
    listaTemasSinPreguntasElemento.innerHTML = ''; // Limpiamos la lista antes de agregar los nuevos elementos

    if (temasSinPreguntas.length === 0) {
        var li = document.createElement('li');
        li.textContent = 'Todos los temas tienen preguntas asociadas';
        listaTemasSinPreguntasElemento.appendChild(li);
    } else {
        temasSinPreguntas.forEach(function(tema) {
            var li = document.createElement('li');
            li.textContent = tema.nombre;
            listaTemasSinPreguntasElemento.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var formTema = document.getElementById('formularioTema');
    var formularioPregunta = document.getElementById('formularioPregunta');
    var totalPreguntasElemento = document.getElementById('totalPreguntas');

    formTema.addEventListener('submit', function(event) {
        event.preventDefault();

        var nombre = document.getElementById('idNombre').value;
        var descripcion = document.getElementById('idDescripcion').value;

        var resultado = crearTema(nombre, descripcion);
        console.log(resultado);
        formTema.reset();
    });

    formularioPregunta.addEventListener('submit', function(event) {
        event.preventDefault();

        var tema = document.getElementById('idTemas').value;
        var nivel = parseInt(document.getElementById('idNivel').value);
        var texto = document.getElementById('idTextoP').value;
        var respuestaCorrecta = document.getElementById('idRespC').value;
        var respuestasIncorrectas = document.getElementById('idRespI').value;

        var resultado = crearPregunta(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema);

        if (typeof resultado === 'object' && resultado instanceof Pregunta) {
            totalPreguntasElemento.textContent = Total de preguntas registradas: ${preguntas.length} preguntas;
            actualizarTablaPreguntas();
        } else {
            console.error(resultado);
        }

        formularioPregunta.reset();
    });

    actualizarListaYContadorTemas();
    actualizarTemasSinPreguntas(); // Llamada inicial aquí
});