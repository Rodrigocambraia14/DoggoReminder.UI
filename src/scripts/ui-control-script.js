//start - switch pages

export function showLoginForm() {
    document.getElementById('login').style.display = 'flex';
    document.getElementById('register').style.display = 'none';
}

export function showRegisterForm() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'flex';
}

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
