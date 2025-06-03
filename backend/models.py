from config import db

class ToDoItem(db.Model):
    item_id = db.Column(db.Integer, primary_key = True)
    text =  db.Column(db.String(80), unique=False, nullable=False)


    def to_json(self):
        return{
            "item_id": self.item_id,
            "text": self.text
        }
#add a user class so can create sessions
