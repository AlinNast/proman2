import { dataHandler } from "./dataHandler.js";
import { htmlFactory, htmlTemplates } from "./htmlFactory.js";
import { domManager } from "./domManager.js";
import { columnsManager } from "./columnsManager.js";
import { cardsManager } from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        const session = await dataHandler.getSession();
        if(session.user_id) {
            const privateBoards = await dataHandler.getPrivateBoards();
            console.log(privateBoards)
            boards.push(...privateBoards)
        }
        
        domManager.addEventListener("#create-board-button", "click", addBoard);
        domManager.addEventListener("#create-board-button-private", "click", addBoardPrivate);

        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            // domManager.addEventListener(`.card-add[data-board-id="${board.id}"]`,'click', addCard)
            domManager.addEventListener(`.toggle-board-button[data-board-id="${board.id}"]`, "click", showHideButtonHandler);
            domManager.addEventListener(`.delete-board[data-board-id="${board.id}"]`,"click", deleteBoard);
            domManager.addEventListener(`.add-column[data-board-id="${board.id}"]`,'click',addColumn)
        }
    },
}


function addBoardPrivate() {
    domManager.initModal('Name your board');
    domManager.handleModalClose();
    document.querySelector('.modal-body button').addEventListener('click', async () => {
        const inputTitle = document.querySelector('#data_input')
        const boardTitle = inputTitle.value;
        let boardId = await dataHandler.createNewBoardPrivate(boardTitle);
        domManager.submitModalClose();
    });
}

function addColumn(clickEvent) {
    console.log('start')
    const boardId = clickEvent.target.dataset.boardId;
    console.log(boardId)
    const inputTitle = document.querySelector("#new-title");
    const title = inputTitle.value;
    dataHandler.createNewColumn(title,boardId)
}

function deleteBoard (clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    dataHandler.deleteBoard(boardId);
    const boardToBeDeleted = document.querySelector(`.board-container[data-board-id="${boardId}"]`);
    boardToBeDeleted.parentNode.removeChild(boardToBeDeleted);
}


function addBoard () {
    domManager.initModal('Name your board')
    domManager.handleModalClose()
    submitBoardAddition()

}


function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const boardTitle = clickEvent.target.dataset.title;
    if (clickEvent.target.dataset.show === 'false') {
        clickEvent.target.dataset.show = "true";
        columnsManager.loadColumns(boardId);
        
    }
    else {
        columnsManager.unloadColumns(boardId, boardTitle);
        clickEvent.target.dataset.show = 'false';
    }
}


function submitBoardAddition() {
    document.querySelector('.modal-body button').addEventListener('click', async () => {
        const inputTitle = document.querySelector('#data_input')
        const boardTitle = inputTitle.value;
        let boardId = await dataHandler.createNewBoard(boardTitle);
        domManager.submitModalClose();
    });
}