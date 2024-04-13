// main.js
import { API_URL } from '../utils/constants.js';
import { validateEmail } from '../utils/validations.js';
import { getDogs } from './my-dogs-script.js';
import { showErrorToast, 
    showLoginForm,
    showRegisterForm,
    showSuccessToast, 
    showWarningToast,
    showLoader,
    hideLoader, 
    showHomePage} from './ui-control-script.js';

document.addEventListener('DOMContentLoaded', function() {
    let storedUserId = localStorage.getItem('userId');

    if(storedUserId != undefined){
        showHomePage();
        return;
    }

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
                return response.json();
            } else {
                throw new Error(response.Error);
            }
        })
        .then(data => {

            localStorage.setItem('userId', data);

            showHomePage();
            getDogs();
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
