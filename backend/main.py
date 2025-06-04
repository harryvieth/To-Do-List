from flask import request, jsonify
from config import app, db
from models import ToDoItem
from flask import send_from_directory

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)



#POST (CREATE)
@app.route("/create_TODO", methods=["POST"])
def create_to_do():
    new_item_text = request.json.get("text")
   

    if not new_item_text:
        return jsonify({"message":"You must include text"}), 400

    new_TODO = ToDoItem(text = new_item_text)
    try:
        db.session.add(new_TODO)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "To-do item created!"}), 201


#GET (READ)
@app.route("/items", methods=["GET"])
def get_contacts():
    items = ToDoItem.query.all()
    json_TODO = list(map(lambda x: x.to_json(), items))
    return jsonify({"items": json_TODO})

#DELETE (DELETE)
@app.route("/delete_todo/<int:item_id>", methods=["DELETE"])
def delete_contact(item_id):
    item = ToDoItem.query.get(item_id)
    if not item:
        return jsonify({"message": "User not found"}), 404
    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200

if __name__== "__main__":
    with app.app_context():
        db.create_all()

    app.run(host="0.0.0.0", port=5000, debug=True)
