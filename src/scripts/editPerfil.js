const perfilOptionArea = document.querySelector('[data-perfil-option]');
const perfilButton = document.querySelector('[data-perfil-button]');

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

perfilButton.addEventListener('click', handlePerfilPress);
