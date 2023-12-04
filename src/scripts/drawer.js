const menuDrawer = document.querySelector('[data-menu-drawer]');
const drawerButton = document.querySelector('[data-drawer-button]');
const menuArea = document.querySelector('[data-menu-area]');
const closeDrawerButton = document.querySelector('[data-close-drawer]');
const bgOpacity = document.querySelector('[data-bg-opacity]');
const documentBody = document.querySelector('body');

function verifyDrawerSelected(selected) {
    menuArea.className = 'menu-area';

    const drawerOptions = menuDrawer.querySelectorAll('li');
    for (const option of drawerOptions) {
        const isSelected = option.getAttribute('data-menu') === selected;        
        option.classList.toggle('bg-green-600', isSelected);
    }
}

// função ao clicar no drawer mobile
function handleDrawerPress() {
    documentBody.className = 'body-container overflow-hidden h-full';
    menuArea.className = 'menu-area flex absolute';
    bgOpacity.className = 'bg-black/50 fixed top-0 right-0 left-0 bottom-0 h-screen w-screen';
}

function handleClosePress() {
    documentBody.className = 'body-container';
    menuArea.className = 'menu-area';
    bgOpacity.className = 'hidden';
}

function handleResize() {
    if (window.innerWidth < 768) {
        handleClosePress();
    }
}

drawerButton.addEventListener('click', handleDrawerPress);
closeDrawerButton.addEventListener('click', handleClosePress);
window.addEventListener('resize', handleResize);
