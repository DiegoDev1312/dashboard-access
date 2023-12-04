const form = document.querySelector('form');
const inputPassword = document.querySelector('[data-input-password]');
const inputPasswordIcon = document.querySelector('[data-password-icon]');
const showPasswordButton = document.querySelector('[data-show-password-button]');
const loginButton = document.querySelector('[data-login-button]');
const inputEmail = document.querySelector('[data-input-email]');
const errorEmailInput = document.querySelector('[data-email-error]');
const errorPasswordInput = document.querySelector('[data-password-error]');

function handleInputPassword() {
    if (inputPasswordIcon.src.includes('close-eye')) {
        inputPasswordIcon.setAttribute('src', './src/images/icons/show-eye.svg');
        inputPassword.type = 'text';
    } else {
        inputPasswordIcon.setAttribute('src', './src/images/icons/close-eye.svg');
        inputPassword.type = 'password';
    }
}

function handleLoginPress() {
    if (!inputEmail.value) {
        return errorEmailInput.className = 'text-red-600 block';
    }
    if (!inputPassword.value) {
        return errorPasswordInput.className = 'text-red-600 block';
    }
    window.location.href = './src/screens/home.html';
}

showPasswordButton.addEventListener('click', handleInputPassword);
loginButton.addEventListener('click', handleLoginPress);
inputEmail.addEventListener('keydown', () => {
    errorEmailInput.className = 'hidden';
});
inputPassword.addEventListener('keydown', () => {
    errorPasswordInput.className = 'hidden';
});
form.addEventListener('click', (event) => {
    event.preventDefault();
});
