// main.js
import { API_URL } from '../utils/constants.js';
import { validateEmail } from '../utils/validations.js';
import { showLoginForm, showRegisterForm} from '../scripts/ui-control-script.js'

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    showLoginForm();

    document.getElementById('register-link').addEventListener('click', function(event) {
        event.preventDefault();
        showRegisterForm();
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        // Validate email format
        if (!validateEmail(emailInput.value)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Validate required inputs
        if (!emailInput.value || !passwordInput.value) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Assuming you have an API endpoint for login
        const formData = new FormData();
        formData.append('email', emailInput.value);
        formData.append('password', passwordInput.value);

        fetch(API_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.Error);
            }
        })
        .then(data => {
            // Handle successful login, e.g., redirect to dashboard
            console.log('Login successful:', data);
            // window.location.href = '/dashboard.html'; // Redirect to dashboard
        })
        .catch(error => {
            // Handle login error
            console.error('Login error:', error);
            alert('Falha ao realizar login, verifique suas credenciais e tente novamente.');
        });
    });
    
});
