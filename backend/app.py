from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost/Projeto1'
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)


class Character(db.Model):
    __tablename__ = 'characters'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(255), nullable=False)
    species = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(255), nullable=True)
    gender = db.Column(db.String(255), nullable=False)
    origin_name = db.Column(db.String(255), nullable=False)
    location_name = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)


class CharacterSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'status', 'species', 'type',
                  'gender', 'origin_name', 'location_name', 'image')


character_schema = CharacterSchema(many=True)


@app.route('/characters', methods=['GET'])
def search_characters():
    name = request.args.get('name')
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=20, type=int)

    characters = Character.query.filter(Character.name.ilike(f"%{name}%")).order_by(
        Character.id.asc()).paginate(page=page, per_page=per_page)

    return jsonify({
        'page': characters.page,
        # 'per_page': characters.per_page,
        'total_pages': characters.pages,
        # 'total_items': characters.total,
        'items': character_schema.dump(characters.items)
    })


if __name__ == '__main__':
    app.run(debug=True)
