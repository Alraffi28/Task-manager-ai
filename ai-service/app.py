from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    description = data.get("description", "").lower()

    # Priority logic
    if "urgent" in description or "immediately" in description:
        priority = "high"
    elif "later" in description or "low" in description:
        priority = "low"
    else:
        priority = "medium"

    # Status logic
    if "completed" in description or "done" in description:
        status = "done"
    else:
        status = "todo"

    return jsonify({
        "priority": priority,
        "status": status
    })

if __name__ == '__main__':
    app.run(port=6000)