from flask import render_template, request, jsonify
from aplication import app
from database.db import insert_records

@app.route('/')
def home_page():
    return render_template("index.html")
    
@app.route('/formulario')
def formulario_page():
    return render_template("formulario.html")
    
@app.route('/consulta')
def consulta_page():
    return render_template("consulta.html")
    
@app.route("/register_user", methods=["POST"])
def register_user():
    data_user =request.form
    nombre = data_user['nombre']
    apellido = data_user['apellido']
    identidad = data_user['identidad']
    email = data_user['email']
    password = data_user['password']
    genero = data_user['genero']
    fechaNacimiento = data_user['fechaNacimiento']
    imagenPerfil = data_user['profilepic']
   
 # Insertar datos en la base de datos usando `insert_records`
    message, status = insert_records(data_user)
    return jsonify({"message": message}), status
    