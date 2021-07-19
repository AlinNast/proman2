from flask import Flask, render_template, url_for, request, session
from flask.json import jsonify
from werkzeug.utils import redirect
from util import json_response
import util
import queires

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route("/")
def index():
    if session:
        user_id = session["id"]
        user = session["user"]
        return render_template('index.html', user=user)
    return render_template('index.html')


@app.route("/test")
def test():
    print('test')
    return 'test'



@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queires.get_boards()


@app.route("/get-cards/<int:column_id>")
@json_response
def get_cards_for_column(column_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queires.get_cards_for_column(column_id)


@app.route("/get-statuses/<int:board_id>")
@json_response
def get_statuses_for_board(board_id: int):
    return queires.get_statuses_for_board(board_id)

@app.route("/delete-card", methods=["DELETE"])
def delete_card():
    if request.is_json:
        card_id = request.json.get("item")
        queires.delete_card(card_id)


@app.route("/rename-card", methods=["PUT"])
@json_response
def rename_card():
    if request.is_json:
        card_id = request.json.get("id")
        card_title = request.json.get("title")
        queires.rename_card(card_id, card_title)


@app.route("/delete-board", methods=["DELETE"])
def delete_board():
    if request.is_json:
        board_id = request.json.get("item")
        queires.delete_cards_by_board_id(board_id)
        queires.delete_statuses_by_board_id(board_id)
        queires.delete_board(board_id)
        return {'message': "ok"}


@app.route("/new-board", methods=["POST"])
@json_response
def create_board():
    if request.is_json:
        board_title = request.json.get("item")
        board_id = queires.add_board(board_title)
        queires.add_status("new",board_id)
        queires.add_status("in progress", board_id)
        queires.add_status("testing", board_id)
        queires.add_status("done", board_id)
        print(board_id)
        return {"boardId": board_id}


@app.route('/get-session')
@json_response
def get_session():
    if session:
        return {"user_id": session["id"]}
    else:
        return {"user_id": ""}


@app.route("/new-board-private", methods=["POST"])
@json_response
def create_board_private():
    if request.is_json:
        board_title = request.json.get("item")
        user_id = session["id"]
        board_id = queires.add_board_private(board_title,user_id)
        queires.add_status("new",board_id)
        queires.add_status("in progress", board_id)
        queires.add_status("testing", board_id)
        queires.add_status("done", board_id)
        return {"boardId": board_id}


@app.route("/new-status/<title>/<int:board_id>")
def create_column(title,board_id: int):
    queires.add_status(title,board_id)


@app.route("/edit-card-status", methods=["PUT"])
@json_response
def edit_status():
    if request.is_json:
        card_id = request.json.get("cardId")
        status_id = request.json.get("columnId")
        queires.edit_card_status(card_id, status_id)
        return " "


@app.route("/create-card", methods= ["POST"])
@json_response
def create_card():
    if request.is_json:
        board_id = request.json.get("boardId")
        status_id = queires.get_first_status_of_board(board_id)
        queires.add_card(board_id)


@app.route('/register-new-account', methods=['POST'])
def new_account():
    if request.is_json:
        user = request.json.get("user")
        password = request.json.get("password")
        hashed_password = util.hash_password(password)
        queires.register_new_account(user,hashed_password)
        return {'message': "ok"}

@app.route('/login', methods=["POST"])
@json_response
def login():
    if request.is_json:
        session.clear()
        user = request.json.get("user")
        password = request.json.get("password")
        if len(queires.get_user(user)) == 0:
            return {"message": "This user doesn't exist"}
        else:
            db_pass = queires.get_user(user)[0]["password"]
            if not util.verify_password(password,db_pass):
                return {"message": "Wrong password"}
            else:
                session['id'] = queires.get_user(user)[0]['id']
                session['user'] = user
                return {"message": "Successfully logged in"}


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


@app.route('/get-private-boards')
@json_response
def get_private_boards():
    if session:
        return queires.get_private_boards(session['id'])


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
