from flask import render_template, request
from aplication import app
from controller.control import func_register_user, func_consult_user

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
    return func_register_user()

@app.route("/consult_user", methods=["GET"])
def consult_user():
    return func_consult_user()