// 1. Creación de referencias al DOM
// Se guardan referencias en cache para no buscar en el DOM cada vez.
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const loadingIndicator = document.getElementById('loadingIndicator');

// Sistema de audio
const bgVideo = document.getElementById('bg-video');
const audioLogin = document.getElementById('audioLogin');
const volumeSlider = document.getElementById('volumeSlider');

// Memoria de sesión
// se usa el LocalStorage para que, si se recarga la página, el servidor siga recordando la conversación.
// Persistencia de datos en el navegador del cliente.
let sessionId = localStorage.getItem('chatSessionId');

// Generar ID aleatorio si no existe
// ID alfanumérico barato y efectivo sin librerías externas.
if (!sessionId) {
  sessionId = Math.random().toString(36).substring(2, 15);
  localStorage.setItem('chatSessionId', sessionId);
  console.log('⚔️ Nueva sesión iniciada en Azeroth:', sessionId);
} else {
  console.log('🛡️ Sesión recuperada:', sessionId);
}

// ==========================================
// 🔊 LÓGICA DE AUDIO (LO COMPLICADO)
// ==========================================
// Nota: Los navegadores bloquean el audio automático hasta que el usuario interactúa.

function setGlobalVolume(val) {
  bgVideo.volume = val;
  audioLogin.volume = val;
}

// Inicializar con el valor del slider HTML (0.4 por defecto)
setGlobalVolume(volumeSlider.value);

function updateMuteButtonUI(isMuted) {
  if (isMuted) {
    // Modo Silencio: Rojo y pulsando
    muteBtn.textContent = '🔇 SONIDO OFF';
    muteBtn.classList.remove('sound-active');
    muteBtn.classList.add('pulsing');
  } else {
    // Modo Activo: Verde y estático
    muteBtn.textContent = '🔊 SONIDO ON';
    muteBtn.classList.add('sound-active');
    muteBtn.classList.remove('pulsing');
  }
}

// Check inicial: El video suele empezar muteado por atributo HTML
updateMuteButtonUI(bgVideo.muted);

// --- LISTENER DEL BOTÓN DE SONIDO ---
// 3. Inicializar Estado del Botón al cargar
// Si el video empieza muteado (lo normal), ponemos el botón en modo alerta
if (bgVideo.muted) {
  updateMuteButtonUI(true);
} else {
  updateMuteButtonUI(false);
}

// 4. Lógica del Botón (INTERRUPTOR / TOGGLE)
muteBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita conflictos con otros clics

  if (bgVideo.muted) {
    // --- ACTIVAR SONIDO ---
    bgVideo.muted = false;
    audioLogin.muted = false;

    // Intentar reproducir ambiente (necesario si estaba pausado)
    audioLogin.play().catch((err) => console.log('Audio play error:', err));

    updateMuteButtonUI(false); // Poner botón verde
    console.log('🔊 Sonido Activado');
  } else {
    // --- SILENCIAR ---
    bgVideo.muted = true;
    audioLogin.muted = true;

    updateMuteButtonUI(true); // Poner botón rojo
    console.log('🔇 Sonido Silenciado');
  }
});

// 5. Listener Global (Para activar sonido al primer clic en cualquier lado)
// Esto ayuda a la UX: si el usuario hace clic en el chat, también activamos el sonido
document.addEventListener(
  'click',
  () => {
    if (bgVideo.muted) {
      bgVideo.muted = false;
      audioLogin.muted = false;
      audioLogin.play().catch((e) => {});
      updateMuteButtonUI(false); // Sincronizar botón a verde
    }
  },
  { once: true },
); // Solo se ejecuta la primera vez

// 6. Listener del Slider
volumeSlider.addEventListener('input', (e) => {
  setGlobalVolume(e.target.value);
});

// --- LÓGICA DE CHAT ---

// Permitir enviar con Enter
userInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // 1. UI: Mostrar mensaje usuario
  addMessage(text, 'user');
  userInput.value = '';
  userInput.disabled = true;
  sendBtn.disabled = true;
  loadingIndicator.style.display = 'block';

  // Auto-scroll al fondo
  chatBox.scrollTop = chatBox.scrollHeight;

  // --- EL TRUCO DEL REY EXÁNIME ---
  // Creamos el mensaje "envenenado" con la instrucción oculta
  const hiddenInstruction =
    '. (IMPORTANTE: Responde actuando como Arthas Menethil, el Rey Exánime de World of Warcraft. Eres arrogante, frío y usas metáforas sobre el hielo, la muerte y la plaga. No rompas el personaje).';

  const messageToSend = text + hiddenInstruction;

  try {
    // 2. BACKEND: Enviar mensaje + SessionID
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: messageToSend,
        sessionId: sessionId, // Clave para la memoria
      }),
    });

    if (!response.ok) throw new Error('Error en el servidor');

    const data = await response.json();

    // 3. UI: Mostrar respuesta Bot
    addMessage(data.text, 'bot');
  } catch (error) {
    console.error(error);
    addMessage(
      'La conexión con el Kirin Tor se ha perdido (Error del servidor).',
      'bot',
    );
  } finally {
    userInput.disabled = false;
    sendBtn.disabled = false;
    loadingIndicator.style.display = 'none';
    userInput.focus();
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.classList.add('message', sender);
  div.textContent = text;
  chatBox.appendChild(div);
}
