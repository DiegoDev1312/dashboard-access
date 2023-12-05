const residentsArea = document.querySelector('[data-residents-area]');

function createResidents(resident) {
    const modelComponents = document.querySelector('.resident-box').cloneNode(true);
    const allInfoText = modelComponents.querySelectorAll('h2');
    const userImage = modelComponents.querySelector('img');

    allInfoText[0].textContent = resident.name;
    allInfoText[1].textContent = resident.telephone;
    allInfoText[2].textContent = resident.document;
    allInfoText[3].textContent = resident.apartmentNumber;
    userImage.src = resident.photo;

    residentsArea.appendChild(modelComponents);
}

function renderResidents() {
    for (const resident of residentsJson) {
        createResidents(resident);
    }
}

renderResidents();
verifyDrawerSelected('residents');
