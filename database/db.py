import pymysql

# Detalles de conexión
db_host = 'database-1.cv826ukmay16.us-east-2.rds.amazonaws.com'
db_user = 'saul'
db_passw = 'admin2024'
db_name = 'formulario_aws'

def connectionSQL():
    """Establece una conexión con la base de datos."""
    try:
        connection = pymysql.connect(
            host=db_host,
            user=db_user,
            password=db_passw,
            database=db_name
        )
        print("Conexión exitosa a la base de datos")
        return connection
    except Exception as err:
        print("Error al conectar a la base de datos:", err)
        return None

def insert_records(data):
    """Inserta un registro en la tabla 'usuarios'."""
    try:
        connection = connectionSQL()  # Conecta a la base de datos
        if connection is not None:
            cursor = connection.cursor()  # Obtiene un cursor para ejecutar SQL
            # Usar parámetros vinculados para evitar inyecciones SQL
            query = """
                INSERT INTO usuarios (nombre, apellido, identidad, email, password, genero, fechaNacimiento)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (
                data['nombre'],
                data['apellido'],
                data['identidad'],
                data['email'],
                data['password'],
                data['genero'],
                data['fechaNacimiento']
            ))
            connection.commit()  # Confirma los cambios
            print("Registro insertado exitosamente")
            return "Registro insertado exitosamente"
        else:
            return "No se pudo conectar a la base de datos"
    except Exception as err:
        print("Error al insertar el registro:", err)
        return "Error al insertar el registro"
    finally:
        if connection:  # Asegura el cierre de la conexión
            connection.close()
