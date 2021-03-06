from flask import Flask, render_template, url_for, request, jsonify
import secrets
from functions import enrollment_forecast

### Initialize Flask App ###
app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_urlsafe(16)

### Website Routes ###
@app.route("/")
def home():
    return render_template('home.html')

@app.route("/enrollment")
def enrollment():
    return render_template('enrollforecast.html', title="Clinical Trial Enrollment Forecast")

@app.route('/API/enrollment', methods=['POST'])
def api_enrollment():
    data = request.get_json()
    plotlyData = enrollment_forecast(data)
    return jsonify(plotlyData)

@app.route("/visit-visualization")
def sankey():
    return render_template('sankey.html', title="Study Visit Visualization")

if __name__ == '__main__':
    app.run(debug=False)