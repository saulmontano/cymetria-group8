import pymysql

db_host = 'database-1.cv826ukmay16.us-east-2.rds.amazonaws.com'
db_user = 'saul'
db_passw = 'admin2024'
db_name = 'formulario_aws'

def connectionSQL():
    try:
        connection = pymysql.connect(
            host = db_host,
            user = db_user,
            password = db_passw,
            
            )
        print("Succesfull connection to DB")
        return connection
    except Exception as err:
        print("Error connecting to DB", err)
        return None
        
        
def insert_records(data):
   
    connection = connectionSQL()  # Obtener la conexión
    if connection is None:
        return "Error connecting to DB"
        
    try:    
        query = "INSERT INTO usuarios (nombre, apellido, identidad, email, password, genero, fechaNacimiento) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        
        cursor = connection.cursor()  # Obtener el cursor
        # Datos para insertar
        cursor.execute(query, (
            data['nombre'],
            data['apellido'],
            data['identidad'],
            data['email'],
            data['password'],
            data['genero'],
            data['fechaNacimiento']
        ))
        connection.commit()  # Confirmar los cambios
        
        print("Registro insertado exitosamente")
    except Exception as err:
        print("Error al insertar el registro:", err)
    finally:
        if connection:  # Asegurarse de cerrar la conexión
            connection.close()