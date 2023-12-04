const forms = document.querySelectorAll('form');
const inputPassword = document.querySelector('[data-input-password]');
const inputPasswordIcon = document.querySelector('[data-password-icon]');
const showPasswordButton = document.querySelector('[data-show-password-button]');
const loginButton = document.querySelector('[data-login-button]');
const inputEmail = document.querySelector('[data-input-email]');
const errorEmailInput = document.querySelector('[data-email-error]');
const errorPasswordInput = document.querySelector('[data-password-error]');
const authInputEmailArea = document.querySelector('[data-input-email-area]');
const authInputPasswordArea = document.querySelector('[data-input-password-area]');
const goToRegisterButton = document.querySelector('[data-go-to-register]');
const loginArea = document.querySelector('[data-login-area]');
const registerArea = document.querySelector('[data-register-area]');
const goToLoginButton = document.querySelector('[data-go-to-login]');

const userInfo = JSON.parse(localStorage.getItem('@user_persist'));

// mudar visualização da senha
function handleInputPassword() {
    if (inputPasswordIcon.src.includes('close-eye')) {
        inputPasswordIcon.setAttribute('src', './src/images/icons/show-eye.svg');
        inputPassword.type = 'text';
    } else {
        inputPasswordIcon.setAttribute('src', './src/images/icons/close-eye.svg');
        inputPassword.type = 'password';
    }
}

// tratar ao clicar em login
function handleLoginPress() {
    if (!inputEmail.value) {
        authInputEmailArea.className = 'auth-input border-red-500';
        return errorEmailInput.className = 'text-red-600 block';
    }
    if (!inputPassword.value) {
        authInputPasswordArea.className = 'auth-input border-red-500';
        return errorPasswordInput.className = 'text-red-600 block';
    }
    if (inputPassword.value.length < 6) {
        authInputPasswordArea.className = 'auth-input border-red-500';
        errorPasswordInput.textContent = 'Insira uma senha maior que 6 dígitos!'
        return errorPasswordInput.className = 'text-red-600 block';
    }

    window.location.href = './src/screens/home.html';
    resetNavigationBrowser();
    localStorage.setItem('@user_persist', JSON.stringify({
        email: inputEmail.value,
    }));
}

// resetando a navegação do browser para não poder voltar
function resetNavigationBrowser() {
    window.history.replaceState(null, null, './src/screens/home.html');
}

// verificação condição para enviar o usuário direto para tela de home
function checkLoginCodition() {
    for (const allForms of forms) {
        allForms.addEventListener('click', (event) => {
            event.preventDefault();
        });
    }

    if (userInfo.email) {
        window.location.href = './src/screens/home.html';
        resetNavigationBrowser();
    }
}

function handleRegisterPress() {
    loginArea.className = 'register-area hidden';
    registerArea.className = 'register-area flex';
}

function handleGoToLoginPress() {
    loginArea.className = 'register-area flex';
    registerArea.className = 'register-area hidden';
}

function changeEmailInput() {
    authInputEmailArea.className = 'auth-input';
    errorEmailInput.className = 'hidden';
}

function changePasswordInput() {
    authInputEmailArea.className = 'auth-input';
    errorEmailInput.className = 'hidden';
}

showPasswordButton.addEventListener('click', handleInputPassword);
loginButton.addEventListener('click', handleLoginPress);
goToRegisterButton.addEventListener('click', handleRegisterPress);
goToLoginButton.addEventListener('click', handleGoToLoginPress)
inputEmail.addEventListener('keydown', changeEmailInput);
inputPassword.addEventListener('keydown', changePasswordInput);

checkLoginCodition();
