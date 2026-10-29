const form = document.querySelector('form');
const message = document.getElementById('message');

form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const isRegister = form.id === 'registerForm';
    const body = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    if (isRegister) body.name = document.getElementById('name').value;

    try {
        const response = await fetch(isRegister ? '/api/register' : '/api/login', {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
        });
        const data = await response.json();
        message.textContent = data.message;
        message.className = `message ${response.ok ? 'success' : 'error'}`;
        if (response.ok && isRegister) setTimeout(() => { window.location.href = '/index.html'; }, 1000);
        if (response.ok && !isRegister) {
            document.body.innerHTML = '<main class="auth-container"><section class="auth-card"><h1>Hello World</h1><p class="subtitle">Login realizado com sucesso.</p></section></main>';
        }
    } catch {
        message.textContent = 'Não foi possível conectar ao servidor.';
        message.className = 'message error';
    }
});
