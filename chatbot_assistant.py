# chatbot_assistant.py
# Refer to README.txt for usage and references.
# J. MINOZZI
# Imports
import numpy as np
import pickle
import tensorflow as tf

from tensorflow.keras.preprocessing.sequence import pad_sequences


# Open preprocessing pickled data from chatbot_train_model.py.
pickle_file = open('pickle_data.pickle', 'rb')
data = pickle.load(pickle_file)
le = pickle.load(pickle_file)
tokenizer = pickle.load(pickle_file)

# Load model that was created with chatbot_train_model.py.
model = tf.keras.models.load_model("chatbot_model.h5")

# Set truncating type and maxlen.
trunc_type = 'post'
max_len = 20


# Process the input string message from the user.
def process_query(string):
    # Keras predict. pad_sequences returns a numpy array for the prediction.
    prediction = model.predict(pad_sequences(tokenizer.texts_to_sequences([string]),
                                             truncating=trunc_type, maxlen=max_len))[0]

    # Find the maximum accuracy for the prediction in the numpy array.
    max_prediction_value_index = np.argmax(prediction)
    category_tag = le.inverse_transform([max_prediction_value_index])

    print(f'[Query Accuracy:\t{prediction[max_prediction_value_index]}]')
    print(f'[max_prediction_value_index:\t{max_prediction_value_index}]')
    print(f'[category_tag:\t{category_tag}]')

    # If the prediction accuracy is greater than 0.8, give a response.
    # Else, send a try again message.
    if prediction[max_prediction_value_index] > 0.8:
        for i in data['intents']:
            if i['tag'] == category_tag:
                # Return a random response from list of responses.
                response = np.random.choice(i['responses'])
                return response
    else:
        return "Sorry, I don't understand what you mean. Please ask another question or request a customer representative."