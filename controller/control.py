from flask import render_template, request, jsonify
from database.db import insert_records,consult_records, connectionSQL
from controller.s3_control import connection_s3, upload_file_s3, save_file
import os
from urllib.parse import quote
def func_register_user():
    data_user = request.form  # Obtener los datos del formulario
    photo = request.files.get('imagenPerfil')  # Obtener el archivo de la solicitud

    # Guardar el archivo en el sistema temporal
    photo_path = save_file(data_user['identidad'], photo)

    # Conexión a S3
    s3_connection = connection_s3()

    if s3_connection:
        # Subir archivo a S3
        if upload_file_s3(s3_connection, photo_path,  photo.filename):
            # Eliminar archivo temporal
            os.remove(photo_path)
            # Insertar datos en la base de datos
            message, status = insert_records(data_user, photo_path)
            return jsonify({"message": message}), status  # Devolver respuesta JSON
        else:
            return jsonify({"message": "Error al cargar archivo en S3"})  # Error al cargar archivo en S3
    else:
        return jsonify({"message": "Error de conexión con S3"})  # Error de conexión con S3
        

def func_consult_user():
    identidad = request.args.get("identidad")
    print("Número de identidad recibido:", identidad)  # Verificar parámetro

    if not identidad:
        return jsonify({"message": "Número de identidad no proporcionado"})

    user_data = consult_records(identidad)
    if user_data:
       
        s3_image_path = f"images/{quote(identidad)}.jpg"  # Se asume que las imágenes tienen extension .jpg

        #URL completa de la imagen en S3
        s3_image_url = f"https://mygallery-s3.s3.us-east-2.amazonaws.com/{s3_image_path}"

        # Formatear los datos del usuario junto con la URL de la imagen de S3
        user_formatted_data = {
            "nombre": user_data[0],
            "apellido": user_data[1],
            "genero": user_data[2],
            "fechaNacimiento": user_data[3].strftime("%d/%m/%Y"),
            "identidad": user_data[4],
            "email": user_data[5],
            "imagen_url": s3_image_url  # Agrega la URL de la imagen al JSON
        }
        return jsonify(user_formatted_data)
    else:
        print("Usuario no encontrado con identidad:", identidad)  
        return jsonify({"message": "Usuario no encontrado"})