// app.js
// Refer to README.txt for usage and references.

class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }
        this.state = false;
        this.messages = [];
        this.firstOpen = true;
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;
        openButton.addEventListener('click', () => this.toggleState(chatBox))
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))
        const node = chatBox.querySelector('input');

        node.addEventListener("keyup", ({key}) => {
            if(key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

	// START J. MINOZZI
    toggleState(chatbox) {
        this.state = !this.state;

        // Show/Hide chatbox.
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }

		if(this.firstOpen) {
			this.firstOpen = !this.firstOpen;
			let welcomemsg1 = { name: "MotivateU", message: "Hi there! I'm the MotivateU chatbot and I'm here to answer any questions you may have about MotivateU's services!" };
			let welcomemsg2 = { name: "MotivateU", message: "You can ask me how to make new classes, how to view your schedule, how to add and remove clients, as well as various other questions. How can I help you today?" };
            this.messages.push(welcomemsg1);
            this.messages.push(welcomemsg2);
            this.updateChatText(chatbox)
		}
    }
	// END J. MINOZZI

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

		// START J. MINOZZI
        fetch('http://127.0.0.1:8080/chatbot', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },	// END J. MINOZZI
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "MotivateU", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "MotivateU") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();