
function mostrarMensaje(tipo, texto) {
    var mensajeError = document.getElementById("mensaje-error");
    var mensajeExito = document.getElementById("mensaje-exito");

    // Ocultar ambos mensajes antes de mostrar el adecuado
    mensajeError.style.display = "none";
    mensajeExito.style.display = "none";

    if (tipo === "error") {
        mensajeError.textContent = texto;  // Texto del mensaje de error
        mensajeError.style.display = "block";  // Mostrar mensaje de error
    } else if (tipo === "exito") {
        mensajeExito.textContent = texto;  // Texto del mensaje de éxito
        mensajeExito.style.display = "block";  // Mostrar mensaje de éxito
    }
}

function consult_user() {
    // Obtener el valor del campo de entrada para la búsqueda
    var identidad = document.querySelector(".input-busqueda").value;

    // Validación adicional si se espera un formato específico (por ejemplo, solo números)
    if (isNaN(identidad)) {
        mostrarMensaje("error", "El número de identidad debe ser un valor numérico.");
        return;
    }

    if (!identidad) {  // Validar que el campo no esté vacío
        alert("Por favor, ingrese un número de identidad.");
        return;
    }
  
  
   
    fetch('/consult_user?identidad=' + identidad)
    .then(response => {
        console.log("Estado de la respuesta:", response.status);  // Verificar estado de la respuesta
        if (!response.ok) {  // Manejar errores en la respuesta
            throw new Error("Usuario no encontrado o error en la consulta");
        }
        return response.json();  // Convertir la respuesta a JSON
    })
    .then(data => {
        console.log("Datos recibidos:", data);  // Verificar datos recibidos

        // Obtener la referencia a la tabla de resultados
        var tablaResultados = document.getElementById("resultados");

        // Limpiar contenido existente en la tabla
        while (tablaResultados.firstChild) {
            tablaResultados.removeChild(tablaResultados.firstChild);
        }

        // Crear una fila y agregar datos de texto
        var fila = document.createElement("tr");

        // Agregar datos de texto a las celdas de la fila
        var keys = ["nombre", "apellido", "genero", "fechaNacimiento", "identidad", "email"];
        keys.forEach(key => {
            var celda = document.createElement("td");
            celda.textContent = data[key];
            fila.appendChild(celda);
        });

        // Agregar la fila a la tabla
        tablaResultados.appendChild(fila);
        // Mostrar la imagen en el contenedor
        var contenedorImagen = document.querySelector(".contenedor-imagen-usuario");
        contenedorImagen.innerHTML = "";  // Limpiar contenido existente
        if (data.imagen_url) {
            var imagenPerfil = document.createElement("img");
            imagenPerfil.src = data.imagen_url;  // Establecer la URL de la imagen
            imagenPerfil.alt = "Imagen de perfil";
            contenedorImagen.appendChild(imagenPerfil);
        } else {
            contenedorImagen.textContent = "No hay imagen disponible";  // Mostrar mensaje si no hay imagen
        }
        
    })
    .catch(error => {
        console.error("Error durante la consulta:", error);  // Manejo de errores
        alert("Error durante la consulta o usuario no encontrado");
    });
}




function toggleNav() {
    const navMenu = document.querySelector('.menu-principal');
    const navBtn = document.querySelector('.menu-btn');

    navMenu.classList.toggle('active');
    navBtn.classList.toggle('active');
}

document.querySelector('.menu-btn').addEventListener('click', toggleNav);
