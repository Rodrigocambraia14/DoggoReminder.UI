// main.js
import { API_URL } from '../utils/constants.js';
import { validateEmail } from '../utils/validations.js';
import { showErrorToast, 
         showLoginForm, 
         showSuccessToast, 
         showWarningToast,
         showLoader,
         hideLoader } from './ui-control-script.js';

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
            showWarningToast('Por favor, insira um e-mail válido.');
            return;
        }

        if (!emailInput.value || !passwordInput.value || !nameInput.value) {
            showWarningToast('Por favor, preencha todos os campos.');
            return;
        }

        const data = {
            email: emailInput.value,
            name: nameInput.value,
            password: passwordInput.value
        };

        showLoader()
        fetch(API_URL + '/user/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {

            if (response.ok) {

                showSuccessToast('Conta criada com sucesso!')

                showLoginForm()

                return;
            } else {
                throw new Error(response.Error);
            }
        })
        .catch(error => {
            // Handle login error
            console.error('Register error:', error);
            showErrorToast('Erro ao se comunicar com o servidor, tente novamente mais tarde.');
        }).finally( () =>{
            hideLoader()
        });
    });

    
});
