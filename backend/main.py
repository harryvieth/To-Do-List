from flask import request, jsonify, session, Flask
from config import app, db
from models import ToDoItem, User
from flask import send_from_directory



@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

#create account
@app.route('/create_account', methods = ["POST"])
def create_account():
    session.clear()
    data = request.json
    new_username = data.get("username")
    new_password = data.get("password")
    if not new_username or not new_password:
        return jsonify({"message": "You must include a username and a password"}), 400
    new_user = User(username = new_username, password= new_password)
    try:
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id  # ✅ Logs them in
        return jsonify({"message": "success"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "success"}), 200

@app.route("/check_session")
def check_session():
    if 'user_id' in session:
        return jsonify({"loggedIn": True})
    return jsonify({"loggedIn": False})

#Login -- fix error messages so same format
@app.route('/login', methods=['POST'])
def login():
    session.clear()
    data = request.json
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    if user:
        session['user_id'] = user.id
        return jsonify(message="Login successful"), 200
    return jsonify(message="Invalid credentials"), 401


#logout -- do after test login and create
@app.route('/logout', methods=["POST"])
def logout():
    #check if session -- dont delete user
    session.clear()
    return jsonify({"message": "logged out"}), 200

#CREATE POST
@app.route("/create_TODO", methods=["POST"])
def create_to_do():
    print("SESSION at /create_TODO:", dict(session))  # 👈 add this

    id = session.get('user_id')
    if not id:
        return jsonify({"message": "Unauthorized"}), 401

    new_item_text = request.json.get("text")
    if not new_item_text:
        return jsonify({"message": "You must include text"}), 400

    new_TODO = ToDoItem(text=new_item_text, user_id=id)  # <-- associate with user

    try:
        db.session.add(new_TODO)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "To-do item created!"}), 201



#GET (READ)
@app.route("/items", methods=["GET"])
def get_contacts():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify(message="Unauthorized"), 401
    items = ToDoItem.query.filter_by(user_id=user_id).all()

    json_TODO = list(map(lambda x: x.to_json(), items))
    return jsonify({"items": json_TODO})

#DELETE (DELETE)
@app.route("/delete_todo/<int:item_id>", methods=["DELETE"])
def delete_contact(item_id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401

    item = ToDoItem.query.filter_by(id=item_id, user_id=user_id).first()
    if not item:
        return jsonify({"message": "Item not found or not yours"}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Item deleted!"}), 200


if __name__== "__main__":
    with app.app_context():
        db.create_all()
        for item in ToDoItem.query.all():
            print(item.item_id, item.text, item.user_id)

    app.run(host="0.0.0.0", port=5000, debug=True)
