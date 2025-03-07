from flask import Flask, jsonify
import uuid
from datetime import datetime, timezone

app = Flask(__name__)

@app.route('/data', methods=['GET'])
def get_data():
    response = {
        "id": str(uuid.uuid4()),  # UUID jako string
        "name": "Sample Data",
        "value": 42.5,  # Float
        "isActive": True,  # Boolean
        "createdAt": datetime.now(timezone.utc).isoformat()  # ISO8601 format datetime
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
