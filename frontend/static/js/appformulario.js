function register_pag() {
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

    if (!nombre || !apellido || !identidad || !email || !password || !confirmarPassword || !genero || !fechaNacimiento || !imagenPerfil) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
    }
    
    if (password !== confirmarPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    if (!termsChecked) {
        alert("Debe aceptar los términos y condiciones.");
        return;
    }

    // Crear un objeto FormData para enviar al servidor
    var formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('identidad', identidad);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('genero', genero);
    formData.append('fechaNacimiento', fechaNacimiento);
    formData.append('imagenPerfil', imagenPerfil);

    // Enviar los datos usando `fetch`
    fetch('/register_user', {
        method: 'POST',
        body: formData,  // Usar FormData para enviar los datos
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al registrar usuario');
        }
        return response.json();
    })
    .then((data) => {
        alert(data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
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
