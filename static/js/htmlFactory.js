export const htmlTemplates = {
    board: 1,
    card: 2,
    column: 3,
    modal:4,
    singleModal:5,
    registrationModal:6,
    loginModal:7
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.column:
            return columnBuilder
        case htmlTemplates.modal:
            return modalBuilder
        case htmlTemplates.singleModal:
            return singleInputModalBuilder
        case htmlTemplates.registrationModal:
            return registrationModalBuiler
        case htmlTemplates.loginModal:
            return loginModalBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}


function boardBuilder(board) {
    return `<div class="board-container" data-board-id=${board.id}>
                <section class="board">
                    <div class="board-header" data-board-id=${board.id}>
                        <span class="board-title" data-board-id=${board.id}>${ board.title }</span>
                        <button class="edit-board-title" data-board-id="${board.id}">Rename</button>
                        <button class="card-add" data-board-id="${board.id}">+ Add Card</button>
                        <button class="add-column" data-board-id="${board.id}" type="button" data-toggle="modal" data-target="#newBoardModal" data-function="create-column">+ Add Column</button>
                        <button class="delete-board" data-board-id="${board.id}" onClick="window.location.reload();" data-function="delete-board">Delete Board</button>
                        <button class="toggle-board-button" data-board-id="${board.id}" data-show=false>&#9660;</button>
                    </div>
                </section>
                <div class="board-columns" data-board-id=${board.id}></div>
            </div>`;
}


function columnBuilder(column) {
    return `<div class="board-column" data-column-id=${column.id}>
                <div class="board-column-title">${column.title}</div>
                <div class="board-column-content" data-column-id=${column.id}></div>
            </div> `
}


function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">
                    <div class="card-remove" data-card-id="${card.id}"><i class="fas fa-trash-alt" data-card-id="${card.id}"></i></div>
                    <div class="card-title" data-card-id="${card.id}" data-card-title="${card.title}">${card.title}</div>
            </div>`;
}

function modalBuilder(modalTitle, whatforID) {
    return `
        <input type="text" id="${whatforID}">
        <button type="button" class="btn btn-primary" id="submit-modal" onClick="window.location.reload();" data-dismiss="modal" aria-label="Close"></button>
    `
}

function singleInputModalBuilder(valueToEdit = null) {
    return `
        <input id="data_input" type="text" ${valueToEdit ? `value="${valueToEdit.title}"` : ""}>
        <button${valueToEdit ? ` id="${valueToEdit.id}"` : ""}>Submit</button>`;
}

function registrationModalBuiler() {
    return `
    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" id="email" required>
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" required>

    <label for="psw-repeat"><b>Repeat Password</b></label>
    <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required>
    <button type="submit" class="registerbtn">Register</button>
    `
}

function loginModalBuilder() {
    return `
    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" id="email" required>
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" required>
    <button type="submit" class="registerbtn">Sign IN</button>
    `
}
//function renameCard (card) {}