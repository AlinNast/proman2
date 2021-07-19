import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";

export let cardsManager = {
    loadCards: async function (columnId) {
        const cards = await dataHandler.getCardsByColumnId(columnId);
        if (cards) {
            for (let card of cards) {
                const cardBuilder = htmlFactory(htmlTemplates.card);
                const content = cardBuilder(card)
                domManager.addChild(`.board-column-content[data-column-id="${columnId}"]`, content)
                domManager.addEventListener(`.card-remove[data-card-id="${card.id}"]`, "click", deleteButtonHandler)
                domManager.addEventListener(`[data-card-id="${card.id}"] .card-title`, 'dblclick', renameCard)
            }
        }
        
    }
}

export function dragElements() {
    const containers = [...document.querySelectorAll('.board-column-content')];
    dragula(containers)
        .on('dragend', (el) => {
            const cardId = el.dataset.cardId;
            const newColumnId = el.parentNode.dataset.columnId;
            dataHandler.editStatus(cardId,newColumnId);
        })
}

function deleteButtonHandler(clickEvent) {
    const cardId = clickEvent.target.dataset.cardId
    console.log(clickEvent.target.dataset.cardId)
    dataHandler.deleteCard(cardId)
    const cardToBeDeleted = document.querySelector(`.card[data-card-id="${cardId}"]`)
    cardToBeDeleted.parentNode.removeChild(cardToBeDeleted);
}


function renameCard(clickEvent) {
    const cardId = clickEvent.target.dataset.cardId;
    let cardTitle = clickEvent.target.dataset.cardTitle;
    let valueToEdit = {"id": cardId, "title": cardTitle}
    domManager.initModal('Rename your card',valueToEdit);
    domManager.handleModalClose();
    document.querySelector('.modal-body button').addEventListener('click', async () => {
        const inputTitle = document.querySelector('#data_input')
        const cardTitle = inputTitle.value;
        // const newCardTitle = 
        await dataHandler.renameCard(cardId,cardTitle);
        // const cardContent = document.querySelector(`.card-title[data-card-id="${cardId}"]`)
        // cardContent.innerHTML = "";
        // cardContent.innerHTML = newCardTitle
        domManager.submitModalClose();
    });
}