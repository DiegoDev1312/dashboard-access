const menuDrawer = document.querySelector('[data-menu-drawer]');

function verifyDrawerSelected(selected) {
    const drawerOptions = menuDrawer.querySelectorAll('li');
    for (const option of drawerOptions) {
        const isSelected = option.getAttribute('data-menu') === selected;
        option.classList.toggle('bg-green-600', isSelected);
    }
}
