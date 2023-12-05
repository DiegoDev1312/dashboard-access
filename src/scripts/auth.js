const forms = document.querySelectorAll('form');
const allInputPassword = document.querySelectorAll('[data-input-password]');
const showPasswordButton = document.querySelectorAll('[data-show-password-button]');
const loginButton = document.querySelector('[data-login-button]');
const goToLoginButton = document.querySelector('[data-go-to-login]');
const registerButton = document.querySelector('[data-register-button]');
const goToRegisterButton = document.querySelector('[data-go-to-register]');
const loginArea = document.querySelector('[data-login-area]');
const registerArea = document.querySelector('[data-register-area]');

// input login - email
const inputEmail = document.querySelector('[data-input-email]');
const errorEmailInput = document.querySelector('[data-email-error]');
const authInputEmailArea = document.querySelector('[data-input-email-area]');

// input login - password
const errorPasswordInput = document.querySelector('[data-password-error]');
const authInputPasswordArea = document.querySelector('[data-input-password-area]');

// input register - name
const registerNameArea = document.querySelector('[data-name-area]');
const registerNameErrorText = document.querySelector('[data-name-error]');
const registerNameInput = document.querySelector('[data-name-input]');

// input register - email
const registerEmailArea = document.querySelector('[data-register-email-area');
const registerEmailError = document.querySelector('[data-register-email-error]');
const registerEmailInput = document.querySelector('[data-register-email]');

// input regiter - password and confirm new password
const registerPasswordArea = document.querySelector('[data-register-password-area]');
const registerConfirmPasswordArea = document.querySelector('[data-confirm-password-area]');
const registerPasswordMessage = document.querySelector('[data-register-password-error]');
const registerConfirmPasswordMessage = document.querySelector('[data-register-confirm-error]');

const userInfo = JSON.parse(localStorage.getItem('@user_persist'));

// mensagens de erro
function defaultMessageError(inputArea, errorArea) {
    inputArea.className = 'auth-input border-red-500';
    errorArea.className = 'text-red-600 block';
}

function messagePasswordLengthError(passwordArea, passwordErrorArea) {
    passwordArea.className = 'auth-input border-red-500';
    passwordErrorArea.textContent = 'Insira uma senha maior que 6 dígitos!'
    passwordErrorArea.className = 'text-red-600 block';
}

function goToHome(email) {
    window.location.href = './src/screens/home.html';
    resetNavigationBrowser();
    localStorage.setItem('@user_persist', JSON.stringify({
        email,
    }));
}

// mudar visualização da senha
function handleInputPassword(event) {
    const idClicked = Number(event.target.attributes['data-password-icon']?.value);
    if (event.target.src.includes('close')) {
        allInputPassword[idClicked].type = 'text';
        event.target.src = './src/images/icons/show-eye.svg';
    } else {
        allInputPassword[idClicked].type = 'password';
        event.target.src = './src/images/icons/close-eye.svg';
    }
}

// tratar ao clicar em login
function handleLoginPress() {
    if (!inputEmail.value) {
        return defaultMessageError(authInputEmailArea, errorEmailInput);
    }
    if (!allInputPassword[0].value) {
        return defaultMessageError(authInputPasswordArea, errorPasswordInput);
    }
    if (allInputPassword[0].value.length < 6) {
        return messagePasswordLengthError(authInputPasswordArea, errorPasswordInput);
    }
    goToHome(inputEmail.value);
}

// tratar ao clicar em registrar
function handleRegisterPress() {
    if (!registerNameInput.value) {
        return defaultMessageError(registerNameArea, registerNameErrorText);
    }
    if (!registerEmailInput.value) {
        return defaultMessageError(registerEmailArea, registerEmailError);
    }
    if (!allInputPassword[1].value) {
        return defaultMessageError(registerPasswordArea, registerPasswordMessage);
    }
    if (allInputPassword[1].value.length < 6) {
        return messagePasswordLengthError(registerPasswordArea, registerPasswordMessage);
    }
    if (!allInputPassword[2].value) {
        return defaultMessageError(registerConfirmPasswordArea, registerConfirmPasswordMessage);
    }
    if (allInputPassword[2].value.length < 6) {
        return messagePasswordLengthError(registerConfirmPasswordArea, registerConfirmPasswordMessage);
    }
    if (allInputPassword[2].value !== allInputPassword[1].value) {
        registerConfirmPasswordArea.className = 'auth-input border-red-500';
        registerConfirmPasswordMessage.textContent = 'Insira a mesma senha em ambos os campos!'
        return registerConfirmPasswordMessage.className = 'text-red-600 block';
    }
    goToHome(registerEmailInput.value);
}

// resetando a navegação do browser para não poder voltar
function resetNavigationBrowser() {
    window.history.replaceState(null, null, './src/screens/home.html');
}

// resetando os erros ao digitar no input
function resetPasswordInputs() {
    for (const inputPassword of allInputPassword) {
        inputPassword.addEventListener('keyup', () => {
            const idInput = inputPassword.getAttribute('data-input-password');
            if (idInput === '0') {
                return resetInputStyles(authInputPasswordArea, errorPasswordInput);
            }
            if (idInput === '1') {
                return resetInputStyles(registerPasswordArea, registerPasswordMessage);
            }
            return resetInputStyles(registerConfirmPasswordArea, registerConfirmPasswordMessage);
        });
    }
}

// verificação condição para enviar o usuário direto para tela de home
function checkLoginCodition() {
    for (const form of forms) {
        form.addEventListener('click', (event) => {
            event.preventDefault();
        });
    }
    for (const showButton of showPasswordButton) {
        showButton.addEventListener('click', handleInputPassword);
    }
    resetPasswordInputs();
    if (userInfo.email) {
        window.location.href = './src/screens/home.html';
        resetNavigationBrowser();
    }
}

function resetInputStyles(inputName, inputArea) {
    inputName.className = 'auth-input';
    inputArea.className = 'hidden';
}

function handleGoToRegister() {
    document.title = 'Registrar';
    loginArea.className = 'register-area hidden';
    registerArea.className = 'register-area flex';
}

function handleGoToLoginPress() {
    document.title = 'Login';
    loginArea.className = 'register-area flex';
    registerArea.className = 'register-area hidden';
}

function changeEmailInput() {
    resetInputStyles(authInputEmailArea, errorEmailInput);
}

function changeNameInput() {
    resetInputStyles(registerNameArea, registerNameErrorText);
}

function changeRegisterEmail() {
    resetInputStyles(registerEmailArea, registerEmailError);
}

loginButton.addEventListener('click', handleLoginPress);
goToRegisterButton.addEventListener('click', handleGoToRegister);
goToLoginButton.addEventListener('click', handleGoToLoginPress)
inputEmail.addEventListener('keyup', changeEmailInput);
registerButton.addEventListener('click', handleRegisterPress);
registerNameInput.addEventListener('keyup', changeNameInput);
registerEmailInput.addEventListener('keyup', changeRegisterEmail);

checkLoginCodition();
