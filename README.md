# NLPChatbot

NLP CHATBOT README


ABOUT THE PROJECT

This program is a chatbot that uses Natural Language Processing that will be used for basic customer service inquiries prior to those inquiries being elevated, when necessary, to a customer success manager.

This is essentially my version of a boilerplate chatbot, that can be used freely, and use my example data as a starting point for any young engineer's journey into AI.


GETTING STARTED

Follow these steps to run this program:
0. Libaries needed can be installed in a Python virtual environment (venv) include: tensorflow, numpy, sklearn, Flask, flask_cors. To install you can use "pip install tensorflow, numpy, sklearn, Flask, flask_cors".
1. In chatbot-backend folder, run chatbot_train_model.py. Wait for completion.
2. In chatbot-backend folder, run chatbot.py. Let service run in background.
3. With chatbot.py running, go to chatbot-frontend folder, open base.html in a browser.
4. The frontend connects to the backend using a local IP address. The default is set to 127.0.0.1:5000. If for some reason chatbot.py is displaying a different IP in the console output, you may need to update/edit the chatbot-frontend/app.js file and replace the IP address with the output chatbot.py shows.
5. Enter queries into the base.html page in your browser.


SOURCES / REFERENCES / CITATIONS

1. https://medium.com/analytics-vidhya/chatbot-with-tensorflow-2-0-going-merry-2f79284a6104
2. https://towardsdatascience.com/how-to-build-your-own-chatbot-using-deep-learning-bb41f970e281
3. https://www.youtube.com/watch?v=a37BL0stIuM&t=760s
