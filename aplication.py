from flask import Flask

app = Flask(__name__, template_folder="frontend/templates", static_folder="frontend", static_url_path="")