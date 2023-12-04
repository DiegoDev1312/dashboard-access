const perfilOptionArea = document.querySelector('[data-perfil-option]');
const perfilButton = document.querySelector('[data-perfil-button]');
const logoutButton = document.querySelector('[data-logout-button]');

function closePerfilOption() {
    perfilOptionArea.classList.replace('block', 'hidden');
}

function handlePerfilPress() {
    if (perfilOptionArea.classList.contains('hidden')) {
        perfilOptionArea.classList.replace('hidden', 'block');
    } else {
        closePerfilOption();
    }
}

function resetNavigationBrowser() {
    window.history.replaceState(null, null, '../../index.html');
    localStorage.removeItem('@user_persist');
}

function handleLogoutPress() {
    window.location.href = '../../index.html';
    resetNavigationBrowser();
}

perfilButton.addEventListener('click', handlePerfilPress);
logoutButton.addEventListener('click', handleLogoutPress);
