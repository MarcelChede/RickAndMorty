import json
import psycopg2

json_file = 'allChars.json'

# Read json file
with open(json_file, 'r', encoding='utf-8') as file:
    json_data = json.load(file)

# Database details
HOST = 'localhost'
DATABASE = 'Projeto1'
USER = 'postgres'
PASSWORD = 'root'

try:
    # Connection to the PostgreSQL database
    connection = psycopg2.connect(
        host=HOST,
        database=DATABASE,
        user=USER,
        password=PASSWORD
    )

    # Create a cursor object to interact with the database
    cursor = connection.cursor()

    # Iterate over the data and insert into the database
    for item in json_data:
        name = item['name']
        status = item['status']
        species = item['species']
        type = item['type']
        gender = item['gender']
        origin_name = item['origin']['name']
        location_name = item['location']['name']
        image = item['image']

        # Define the SQL query for inserting the data
        sql_query = "INSERT INTO characters (name, status, species, type, gender, origin_name, location_name, image) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"

        # Execute the SQL query with the extracted data
        cursor.execute(sql_query, (name, status, species,
                       type, gender, origin_name, location_name, image))

    # Commit the changes to the database
    connection.commit()

    print("Data inserted successfully!")

except psycopg2.Error as error:
    print("Error connecting to PostgreSQL database:", error)

finally:
    # Close the cursor and the database connection
    if cursor:
        cursor.close()
    if connection:
        connection.close()
