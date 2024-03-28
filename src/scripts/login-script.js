// main.js
import { API_URL } from '../utils/constants.js';
import { validateEmail } from '../utils/validations.js';
import { showErrorToast, 
    showLoginForm,
    showRegisterForm,
    showSuccessToast, 
    showWarningToast,
    showLoader,
    hideLoader } from './ui-control-script.js';

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

        const data = {
            email: emailInput.value,
            password: passwordInput.value
        }

        showLoader()

        fetch(API_URL + '/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {

            if (response.ok) {

                //trocar por show Home form
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
