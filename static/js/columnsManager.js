import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";
import { cardsManager, dragElements } from "./cardsManager.js";


export let columnsManager = {
    loadColumns: async function(boardId) {
        const columns = await dataHandler.getStatusesByBoardId(boardId);
        // domManager.addEventListener(`.add-column[data-board-id="${board.id}"]`,'click',addColumn)
        for(let column of columns) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const content = columnBuilder(column);
            domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);
            let columnId = column.id;
            cardsManager.loadCards(columnId);
        }
        await dragElements()
    },
    unloadColumns: function(boardId) {
        document.querySelector(`.board-columns[data-board-id="${boardId}"]`).innerText = "";
    }
}

// function addColumn(clickEvent) {
//     console.log('start')
//     const boardId = clickEvent.target.dataset.boardId;
//     console.log(boardId)
//     const inputTitle = document.querySelector("#new-title");
//     const title = inputTitle.value;
//     dataHandler.createNewColumn(title,boardId)
// }