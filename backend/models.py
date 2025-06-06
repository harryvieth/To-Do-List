from config import db



class User(db.Model):
    __tablename__ = 'users'  # 👈 explicit table name

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)  








class ToDoItem(db.Model):
    item_id = db.Column(db.Integer, primary_key = True)
    text =  db.Column(db.String(80), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)



    def to_json(self):
        return{
            "item_id": self.item_id,
            "text": self.text,
            "user_id": self.user_id
        }
#add a user class so can create sessions

