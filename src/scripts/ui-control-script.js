//start - switch pages

export function showLoginForm() {
    document.getElementById('login').style.display = 'flex';
    document.getElementById('register').style.display = 'none';
    document.getElementById('home').style.display = 'none';
}

export function showHomePage() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('home').style.display = 'flex';
}

export function showRegisterForm() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'flex';
    document.getElementById('home').style.display = 'none';
}

export function logout() {
    document.getElementById('login').style.display = 'flex';
    document.getElementById('register').style.display = 'none';
    document.getElementById('home').style.display = 'none';

    localStorage.clear();
}

document.addEventListener("DOMContentLoaded", function() {
    // Obtém a referência do elemento
    var logoutButton = document.getElementById("logout-button");

    // Adiciona um ouvinte de evento de clique ao elemento
    logoutButton.addEventListener("click", function() {
        // Chame a função de logout aqui
        logout();
    });
});

//end - switch pages

//start - toast

export function showSuccessToast(message) {
    Toastify({
        text: message,
        duration: 2000,
        style: {
            background: "green",
          },
        }).showToast();
}

export function showErrorToast(message) {
    Toastify({
        text: message,
        duration: 2000,
        style: {
            background: "red",
          },
        }).showToast();
}

export function showWarningToast(message) {
    Toastify({
        text: message,
        duration: 2000,
        style: {
            background: "orange",
          },
        }).showToast();
}

//end - toast

//start - loader

export function showLoader() {
    let loaderContainer = document.getElementById('loader-container');
    loaderContainer.style.display = 'flex'
}

export function hideLoader() {
    let loaderContainer = document.getElementById('loader-container');
    loaderContainer.style.display = 'none'
}
