from flask import render_template, request, jsonify
from aplication import app
from database.db import insert_records
from database.db import connectionSQL

@app.route('/')
def home_page():
    """Ruta para la página de inicio."""
    return render_template("index.html")

@app.route('/formulario')
def formulario_page():
    """Ruta para el formulario."""
    return render_template("formulario.html")

@app.route('/consulta')
def consulta_page():
    """Ruta para una página de consulta."""
    return render_template("consulta.html")

@app.route("/register_user", methods=["POST"])
def register_user():
    """Ruta para registrar un usuario a través del formulario."""
    data_user = request.form  # Obtener los datos del formulario
    
    # Aquí se llama a la función `insert_records` para insertar en la base de datos
    message, status = insert_records(data_user)  # Insertar datos y obtener respuesta
    
    return jsonify({"message": message}), status  # Devuelve la respuesta como JSON

@app.route("/consult_user", methods=["GET"])
def consult_user():
    identidad = request.args.get("identidad")
    print("Número de identidad recibido:", identidad)  # Verificar parámetro

    if not identidad:
        return jsonify({"message": "Número de identidad no proporcionado"}), 400  # Sin parámetro

    try:
        connection = connectionSQL()  # Conexión a la base de datos
        print("Conexión establecida")
        cursor = connection.cursor()

        # Consulta para obtener el usuario por número de identidad
        query = "SELECT nombre, apellido, genero, fechaNacimiento, identidad, email FROM usuarios WHERE identidad = %s" #, profile_pic 
        cursor.execute(query, (identidad,))  # Usar parámetros vinculados para evitar inyecciones SQL
        print("Consulta ejecutada:", query) 
        
        result = cursor.fetchone()  # Obtener solo un resultado

        if result:
            # Devolver datos como JSON
            user_data = {
                "nombre": result[0],
                "apellido": result[1],
                "genero": result[2],
                "fechaNacimiento": result[3].strftime("%d/%m/%Y"),
                "identidad": result[4],
                "email": result[5],
               # "profile_pic": result[6].decode() if result[6] else None
            }
            return jsonify(user_data), 200
        else:
            print("Usuario no encontrado con identidad:", identidad)  # Verificar resultado
            return jsonify({"message": "Usuario no encontrado"}), 404  # Usuario no encontrado

    except Exception as e:
        print("Error durante la consulta:", e)  # Log de error
        return jsonify({"message": "Error durante la consulta"}), 500  # Error interno del servidor

    finally:
        if connection:
            connection.close()  # Cerrar conexión
