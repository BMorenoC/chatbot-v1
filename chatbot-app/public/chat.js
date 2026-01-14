const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const loadingIndicator = document.getElementById('loadingIndicator');

// Permitir enviar con Enter
userInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // 1. Mostrar mensaje del usuario
  addMessage(text, 'user');
  userInput.value = '';
  userInput.disabled = true;
  sendBtn.disabled = true;
  loadingIndicator.style.display = 'block';

  try {
    // 2. Enviar al Backend (NestJS)
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    });

    if (!response.ok) throw new Error('Error en el servidor');

    const data = await response.json();

    // 3. Mostrar respuesta del Bot
    addMessage(data.text, 'bot');
  } catch (error) {
    console.error(error);
    addMessage('Lo siento, hubo un error conectando con el cerebro.', 'bot');
  } finally {
    userInput.disabled = false;
    sendBtn.disabled = false;
    loadingIndicator.style.display = 'none';
    userInput.focus();
  }
}

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.classList.add('message', sender);
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
