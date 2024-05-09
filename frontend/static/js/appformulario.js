// Función para validar y enviar el formulario
function register_pag() {
    // Obtener valores de los campos del formulario
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var identidad = document.getElementById("identidad").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmarPassword = document.getElementById("confirm-password").value;
    var genero = document.getElementById("gender").value;
    var fechaNacimiento = document.getElementById("birthdate").value;
    var imagenPerfil = document.getElementById("profilepic").files[0];  // Archivo de imagen
    var termsChecked = document.getElementById("terms").checked;

    // Validaciones básicas para campos vacíos
    if (!nombre || !apellido || !identidad || !email || !password || !confirmarPassword || !genero || !fechaNacimiento) {
        alert("Por favor, complete todos los campos requeridos.");
        return;  // Detener si algún campo está vacío
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmarPassword) {
        alert("Las contraseñas no coinciden.");
        return;  // Detener si las contraseñas no coinciden
    }

    if (!termsChecked) {  // Validar aceptación de términos y condiciones
        alert("Debe aceptar los términos y condiciones.");
        return;  // Detener si el checkbox no está marcado
    }

    // Crear un objeto para enviar al servidor
    var datosFormulario = {
        nombre: nombre,
        apellido: apellido,
        identidad: identidad,
        email: email,
        password: password,
        genero: genero,
        fechaNacimiento: fechaNacimiento,
        imagenPerfil: imagenPerfil  // Archivo
    };

    // Enviar los datos usando `fetch`
    fetch('/register_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',  // Para datos de formularios
        },
        body: new URLSearchParams(datosFormulario),  // Convertir a formato adecuado para envío
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al registrar usuario');  // Manejo de errores de respuesta
        }
        return response.json();  // Convertir respuesta a JSON
    })
    .then((data) => {
        alert(data.message);  // Mostrar mensaje del servidor
    })
    .catch((error) => {
        console.error('Error:', error);  // Manejo de errores
    });

     // Mostrar mensaje de éxito o realizar otras acciones necesarias
    console.log("Datos del formulario:", nombre, apellido, identidad, email, password, genero, fechaNacimiento, imagenPerfil, termsChecked);
     // Limpiar los campos del formulario después de enviar
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("identidad").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirm-password").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("birthdate").value = "";
    document.getElementById("profilepic").value = "";
    document.getElementById("terms").checked = false;
}


function toggleNav() {
  const navMenu = document.querySelector('.menu-principal');
  const navBtn = document.querySelector('.menu-btn');

  navMenu.classList.toggle('active');
  navBtn.classList.toggle('active');
}

document.querySelector('.menu-btn').addEventListener('click', toggleNav);
