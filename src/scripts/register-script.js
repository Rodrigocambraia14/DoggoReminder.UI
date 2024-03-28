// main.js
import { API_URL } from '../utils/constants.js';
import { validateEmail } from '../utils/validations.js';
import { showLoginForm } from './ui-control-script.js';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('register-form');

    document.getElementById('login-link').addEventListener('click', function(event) {
        event.preventDefault();
        showLoginForm();
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        const emailInput = document.getElementById('register-email');
        const nameInput = document.getElementById('register-name');
        const passwordInput = document.getElementById('register-password');

        if (!validateEmail(emailInput.value)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        if (!emailInput.value || !passwordInput.value || !nameInput.value) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const formData = new FormData();
        formData.append('email', emailInput.value);
        formData.append('name', nameInput.value);
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
            console.log('Register successful:', data);
            // window.location.href = '/dashboard.html'; // Redirect to dashboard
        })
        .catch(error => {
            // Handle login error
            console.error('Register error:', error);
            alert('Falha ao realizar cadastro, verifique seus dados e tente novamente.');
        });
    });

    
});
