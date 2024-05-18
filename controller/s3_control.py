from boto3.session import Session
from botocore.exceptions import ClientError
from keys import ACCESS_KEY, SECRET_KEY

def connection_s3():
    try:
        session_aws = Session(ACCESS_KEY, SECRET_KEY)
        s3_connection = session_aws.resource('s3')
        print("conexcion exitosa con S3")
        return s3_connection
    except ClientError as Err:
        print("conexcion fallida con S3", Err)
        return  None
        
def save_file(id, photo):
    photo_extension = photo.filename.split(".")[1]
    photo_path = "/tmp/" + id + "." + photo_extension
    photo.save(photo_path)
    return photo_path
    
def upload_file_s3(s3_connection, photo_path, file_name):
    bucket_name = 'mygallery-s3'
    path_s3 = 'images/' + file_name
    try:
        s3_connection.meta.client.upload_file(photo_path, bucket_name, path_s3)
        print("El archivo se ha subido correctamente a S3")
        return True
    except Exception as e:
        print("Error al subir el archivo a S3:", e)
        return False