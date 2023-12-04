const bodyApartmentsTable = document.querySelector('[data-tbody-apartments]');
const paginationArea = document.querySelector('[data-pagination-area]');

const statusName = {
    'paid': 'Pago',
    'expired': 'Atrasado',
    'pending': 'Pendente',
};
const statusColor = {
    'paid': 'text-green-500',
    'expired': 'text-red-600',
    'pending': 'text-yellow-600',
}

let page = 1;

const createElement = (element) => document.createElement(element);

function getStatusName(status) {
    return statusName[status];
}

// criação da tabela de apartamentos
function createApartmentTable(table) {
    const tableRow = createElement('tr');

    const apartmentTdNumber = createElement('td');
    const apartmentReferenceMonth = createElement('td');
    const apartmentStatus = createElement('td');
    const actionTd = createElement('td');
    const actionTdButton = createElement('button');
    const actionImage = createElement('img');

    if (table.paymentSlip) {        
        actionImage.src = '../images/icons/pdf-icon.svg'
        actionImage.className = 'h-6 w-6 pointer';
        actionTdButton.appendChild(actionImage);
        actionTdButton.addEventListener('click', () => handleDownloadPress(table.paymentSlip));
    } else {
        actionTd.textContent = 'Indisponível';
    }

    apartmentTdNumber.textContent = table.apartmentNumber;
    apartmentTdNumber.className = 'p-2 font-bold md:p-3 ';
    apartmentReferenceMonth.textContent = table.monthReference;
    apartmentStatus.textContent = getStatusName(table.status);
    apartmentStatus.className = `${statusColor[table.status]}`;

    tableRow.className = 'text-left text-white';

    actionTd.appendChild(actionTdButton);
    tableRow.append(apartmentTdNumber, apartmentReferenceMonth, apartmentStatus, actionTd);
    bodyApartmentsTable.appendChild(tableRow);
}

// criação da paginação da tabela
function createPages(totalPage) {
    paginationArea.innerHTML = '';
    for (let i = 0; i < totalPage; i++) {
        const paginationButton = createElement('button'); 
        const focusButtonValue = i + 1 === page ? 12 : 8;
        console.log(focusButtonValue);
        paginationButton.className = `h-${focusButtonValue} w-${focusButtonValue} bg-zinc-700 flex items-center justify-center text-white rounded`;
        paginationButton.textContent = i + 1;

        paginationButton.addEventListener('click', () => {
            page = i + 1;
            init();
        });

        paginationArea.appendChild(paginationButton);
    }
}

// inicialização dos meus dados padrões
function init() {
    bodyApartmentsTable.innerHTML = '';

    const initialSlice = (page - 1) * 10;
    const finishSlice = page * 10;
    const totalPage = Math.ceil(apartmentsJson.length / 10);
    const paginationTable = apartmentsJson.slice(initialSlice, finishSlice);

    createPages(totalPage);

    for (const apartmentInfo of paginationTable) {
        createApartmentTable(apartmentInfo);
    }
}

verifyDrawerSelected('home');
init();
