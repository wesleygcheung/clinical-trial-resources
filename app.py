from flask import Flask, render_template, url_for, request, jsonify
from flask_wtf.csrf import CSRFProtect
import secrets
from functions import enrollment_forecast

### Initialize Flask App ###
app = Flask(__name__)
# CSRFProtect(app)
app.config['SECRET_KEY'] = secrets.token_urlsafe(16)

### Website Routes ###
@app.route("/")
def home():
    return render_template('home.html')

@app.route("/enrollment")
def enrollment():
    return render_template('enrollforecast.html')

@app.route('/API/enrollment', methods=['POST'])
def api_enrollment():
    data = request.get_json()
    plotlyData = enrollment_forecast(data)
    return jsonify(plotlyData)

if __name__ == '__main__':
    app.run(debug=False)