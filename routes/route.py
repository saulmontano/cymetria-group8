from flask import render_template, request, jsonify
from aplication import app
from database.db import insert_records

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
