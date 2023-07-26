from flask import Flask, request, jsonify
import psycopg2
from psycopg2 import Error, OperationalError

app = Flask(__name__)


def get_character_by_name(name, page):
    
    try:
        # Connection to the PostgreSQL database
        connection = psycopg2.connect(
            host='localhost',
            database='Projeto1',
            user='postgres',
            password='root'
        )
    except OperationalError as error:
        print("Error connecting to the database:", error)
    except Error as error:
        print("Error occurred while executing database query:", error)

    cursor = connection.cursor()

    limit = 20
    offset = (page - 1) * limit

    cursor.execute("""
        SELECT *
        FROM characters
        WHERE name = %s
        ORDER BY name
        LIMIT %s
        OFFSET %s;
    """, (name, limit, offset))

    characters = cursor.fetchall()
    cursor.close()
    connection.close()
    return characters


@app.route('/characters', methods=['GET'])
def search_characters():
    
    name = request.args.get('name')
    page = request.args.get('page', default=1, type=int)
    return jsonify(get_character_by_name(name, page))


if __name__ == '__main__':
    app.run()
