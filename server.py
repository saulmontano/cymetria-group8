from aplication import app
from routes.route import *

if __name__ == "__main__":
    host="0.0.0.0"
    port="8080"
    app.run( host, port, debug=True)

