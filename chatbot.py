# chatbot.py
# Refer to README.txt for usage and references.
# @Author T.Turnier
# Imports
from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot_assistant import process_query
from ddtrace.runtime import RuntimeMetrics


RuntimeMetrics.enable()


# Create a new instance of Flask.
app = Flask(__name__)
CORS(app)


# Create Flask route with a POST method for sending the message to our frontend.
@app.post('/chatbot')
def chatbot():
    # Retrieve message from user.
    message_from_user = request.get_json().get('message')
    print(f'[message_from_user:\t{message_from_user}]')

    # Process message_from_user by sending it to our chatbot_assistant.py.
    response = process_query(message_from_user)

    # Format response to be JSON friendly.
    response_formatted = {'answer': response}
    print(f'[response_formatted:\t{response_formatted}]')

    # Return a jsonify version of the response.
    return jsonify(response_formatted)


# Run Flask app.
if __name__ == '__main__':
    app.run(host='127.0.0.1',port=8080,debug=True) 