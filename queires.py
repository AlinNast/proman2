import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        WHERE user_id is NULL
        ;
        """
    )


def get_cards_for_column(column_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.status_id = %(column_id)s
        ORDER BY card_order
        ;
        """
        , {"column_id": column_id})

    return matching_cards


def get_statuses_for_board(board_id):
    matching_statuses = data_manager.execute_select(
        """
        SELECT * FROM statuses
        WHERE statuses.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_statuses


def delete_card(card_id):
    data_manager.execute_query(
        """
        DELETE FROM cards
        WHERE cards.id = %(card_id)s
        ;
        """
        , {"card_id": card_id}
    )


def delete_board(board_id):
    data_manager.execute_query(
        """
        DELETE FROM boards
        WHERE boards.id = %(board_id)s
        """
        , {"board_id": board_id}
    )


def delete_cards_by_board_id(board_id):
    data_manager.execute_query(
        """
        DELETE FROM cards
        WHERE cards.board_id = %(board_id)s
        """
        , {"board_id": board_id}
    )


def delete_statuses_by_board_id(board_id):
    data_manager.execute_query(
        """
        DELETE FROM statuses
        WHERE statuses.board_id = %(board_id)s
        """
        , {"board_id": board_id}
    )


def rename_card(card_id, card_title):
    data_manager.execute_query(
        """
        UPDATE cards
        SET title = %(card_title)s
        WHERE cards.id = %(card_id)s
        ;
        """
        , {"card_title":card_title, "card_id": card_id}
    )


def add_board(board_title):
    board = data_manager.execute_select(
        """
        INSERT INTO boards (title)
        VALUES (%(board_title)s)
        RETURNING id;
        ;
        """
        , {"board_title": board_title}
    )
    board_id = board[0]["id"]
    return board_id

def add_board_private(board_title, user_id):
    board = data_manager.execute_select(
        """
        INSERT INTO boards (title,user_id)
        VALUES (%(board_title)s,%(user_id)s)
        RETURNING id;
        ;
        """
        , {"board_title": board_title,"user_id":user_id}
    )
    board_id = board[0]["id"]
    return board_id

def add_status(status_title,board_id):
    data_manager.execute_query(
        """
        INSERT INTO statuses(title, board_id)
        VALUES (%(status_title)s, %(board_id)s)
        ;
        """
        , {"status_title": status_title, "board_id": board_id}
    )

def edit_card_status(card_id, status_id,order):
    data_manager.execute_query(
        """
        UPDATE cards
        SET status_id = %(status_id)s, card_order=%(order)s
        WHERE cards.id = %(card_id)s
        ;
        """
        , {"status_id": status_id, "card_id": card_id, "order":order}
    )

def register_new_account(user, password):
    data_manager.execute_query(
        """
        INSERT INTO users(name, password)
        VALUES (%(user)s,%(pass)s)
        ;
        """
        , {"user":user, "pass":password}
    )

def get_user(username):
    return data_manager.execute_select(
        """
        SELECT * FROM users
        WHERE name = %(username)s
        """
        , {"username":username}
    )

def get_private_boards(user_id):
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        WHERE user_id = %(user_id)s
        """
        , {"user_id": user_id}
    )

def get_new_status_id_from_board(board_id):
    return data_manager.execute_select(
        """
        SELECT id
        FROM statuses
        WHERE title='new' AND board_id = %(board_id)s
        """
        , {"board_id": board_id}, False
    )

def add_card(card_title, board_id, status_id, order):
    data_manager.execute_query(
        """
        INSERT INTO cards (board_id,status_id,title,card_order)
        VALUES (%(board_id)s, %(status_id)s, %(title)s, %(order)s)
        """
        , {"board_id":board_id,"status_id":status_id,"title":card_title,"order":order}
    )
