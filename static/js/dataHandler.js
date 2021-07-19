export let dataHandler = {
    getBoards: async function () {
        return await apiGet('/get-boards')
    },
    getBoard: async function(boardId) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getStatusesByBoardId: async function (boardId) {
        return await apiGet(`/get-statuses/${boardId}`)
    },
    getCardsByColumnId: async function (columnId) {
        return await apiGet(`/get-cards/${columnId}`)
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle) {
        return await apiPost('/new-board',{item: boardTitle})
    },
    createNewBoardPrivate: async function (boardTitle) {
        return await apiPost('/new-board-private',{item: boardTitle})
    },
    createNewCard: async function (cardTitle, boardId) {
        return await apiPost('/create-card',{cardTitle:cardTitle,boardId:boardId})
    },
    createNewColumn: async function(columnTitle,boardId) {
        return await apiPost(`/new-status`, {columnTitle:columnTitle,boardId:boardId})
    },
    deleteCard: async function (cardId) {
        return await apiDelete("/delete-card",{item: cardId})
    },
    renameCard: async function (cardId,cardTitle) {
        return await apiPut("/rename-card",{id: cardId, title: cardTitle})
        //return response
    },
    deleteBoard: async function (boardId) {
        return await apiDelete("/delete-board",{item: boardId})
    },
    editStatus: async function (cardId, columnId,order) {
        return await apiPut("/edit-card-status",{cardId: cardId, columnId: columnId, order:order})
    },
    createNewUser: async function(user, password) {
        return await apiPost('/register-new-account',{user:user,password:password})
    },
    loginUser: async function(user, password) {
        return await apiPost('/login',{user:user,password:password})
    },
    getSession: async function() {
        return await apiGet('/get-session')
    },
    getPrivateBoards: async function() {
        return await apiGet('/get-private-boards')
    },
    renameBoard: async function(boardId, title) {
        return await apiPut('/rename-board',{boardId:boardId,title:title})
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: 'GET',
    })
    if (response.status === 200) {
        return response.json();
    }
}

async function apiPost(url, payload) {
    const req = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (req.ok) {
        return await req.json();
    }
}

async function apiDelete(url, payload) {
    const req = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (req.ok) {
        return await req.json();
    }
}

async function apiPut(url,payload) {
    const req = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (req.ok) {
        return await req.json();
    }
}
