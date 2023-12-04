const tableBody = document.querySelector('[data-tbody-receipts]');

const createElement = (element) => document.createElement(element);

function createReceiptsTable(receipts) {
    const createTableRow = createElement('tr');
    createTableRow.className = 'text-left text-white';

    const apartmentData = createElement('td');
    const receiptMonth = createElement('td');
    const receiptOption = createElement('td');
    const actionTdButton = createElement('button');
    const actionImage = createElement('img');

    apartmentData.textContent = receipts.apartmentNumber;
    apartmentData.className = 'p-3';
    receiptMonth.textContent = receipts.monthReference;
    
    actionImage.src = '../images/icons/pdf-icon.svg'
    actionImage.className = 'h-6 w-6 pointer';
    actionTdButton.appendChild(actionImage);
    actionTdButton.addEventListener('click', () => handleDownloadPress(receipts.receipt));
    receiptOption.appendChild(actionTdButton)

    createTableRow.append(apartmentData, receiptMonth, receiptOption);
    tableBody.appendChild(createTableRow);
}

function initTableReceipts() {
    for (const receipts of receiptsJson) {
        createReceiptsTable(receipts);
    }
}

initTableReceipts();
verifyDrawerSelected('receipts');
