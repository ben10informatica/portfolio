const messagesEl = document.getElementById('messages');
const form = document.getElementById('chatForm');
const input = document.getElementById('input');
const sendBtn = document.getElementById('sendBtn');
const newChatBtn = document.getElementById('newChat');

let history = [];

function appendMessage(role, content, loading = false) {
  const div = document.createElement('div');
  div.className = `message ${role}${loading ? ' loading' : ''}`;
  div.innerHTML = `<div class="bubble">${content}</div>`;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return div;
}

function removeLoading() {
  const loading = messagesEl.querySelector('.message.loading');
  if (loading) loading.remove();
}

async function sendMessage(text) {
  if (!text.trim()) return;

  appendMessage('user', text);
  history.push({ role: 'user', content: text });
  input.value = '';
  sendBtn.disabled = true;

  appendMessage('assistant', 'Pensando...', true);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    });

    if (!res.ok) throw new Error('Erro na API');
    const data = await res.json();

    removeLoading();
    appendMessage('assistant', data.reply);
    history.push({ role: 'assistant', content: data.reply });
  } catch {
    removeLoading();
    appendMessage('assistant', 'Erro ao conectar com a API. Verifique se o servidor está rodando.');
  } finally {
    sendBtn.disabled = false;
    input.focus();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage(input.value);
});

newChatBtn.addEventListener('click', () => {
  history = [];
  messagesEl.innerHTML = `
    <div class="message assistant">
      <div class="bubble">Nova conversa iniciada. Como posso ajudar?</div>
    </div>`;
});

document.querySelectorAll('.prompt-chip').forEach((btn) => {
  btn.addEventListener('click', () => sendMessage(btn.dataset.prompt));
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    form.requestSubmit();
  }
});
