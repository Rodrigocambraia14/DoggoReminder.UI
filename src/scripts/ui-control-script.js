export function showLoginForm() {
    document.getElementById('login').style.display = 'flex';
    document.getElementById('register').style.display = 'none';
}

// register.js

export function showRegisterForm() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'flex';
}