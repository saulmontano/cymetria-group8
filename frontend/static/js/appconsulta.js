// Función para mostrar mensajes de error o éxito
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
    

    // Realizar una solicitud GET para obtener datos del usuario
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

        // Crear una fila y agregar datos
        var fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${data.nombre}</td>
            <td>${data.apellido}</td>
            <td>${data.genero}</td>
            <td>${data.fechaNacimiento}</td>
            <td>${data.identidad}</td>
            <td>${data.email}</td>
            
        `;

        // Agregar la fila a la tabla<td><center>${data.profile_pic ? '<img src="data:image/png;base64,' + data.profile_pic + '" alt="Imagen de perfil">' : 'No hay imagen'}</center></td>
        tablaResultados.appendChild(fila);

        alert("Consulta realizada con éxito");  // Mensaje de éxito
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
