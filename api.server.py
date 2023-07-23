from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3
app = Flask(__name__)
CORS(app)

Db_path= 'Tornado.db'

@app.route('/api/tornadoes/2011_to_2021', methods=['GET'])
def get_2011_to_2021_tornadoes():
    try:
        con= sqlite3.connect(Db_path)
        cur= con.cursor()
        cur.execute('SELECT * FROM "2011_to_2021_Tornadoes"')
        tornadoes_data = cur.fetchall()
        conn.close()
        
        return jsonify(tornadoes_data)
    except Exception as e:
        return jsonify({'error':str(e)}), 500
@app.route('/api/tornadoes/efs_3', methods=['GET'])
def get_efs_3_tornadoes():
    try:
        con= sqlite3.connect(Db_path)
        cur= con.cursor()
        cur.execute('SELECT * FROM "EFS_3_Tornadoes"')
        efs_3_data= cur.fetchall()
        con.close()
        return jsonify(efs_3_data)
    except Exception as e:
        return jsonify({'error':str(e)}), 500
@app.route('/api/tornadoes/efs_4', methods=['GET'])
def get_efs_4_tornadoes():
    try:
        con= sqlite3.connect(Db_path)
        cur= con.cursor()
        cur.execute('SELECT * FROM "EFS_4_Tornadoes"')
        efs_4_data= cur.fetchall()
        con.close()
        return jsonify(efs_4_data)
    except Exception as e:
        return jsonify({'error':str(e)}), 500
@app.route('/api/tornadoes/efs_5', methods=['GET'])
def get_efs_5_tornadoes():
    try:
        con= sqlite3.connect(Db_path)
        cur= con.cursor()
        cur.execute('SELECT * FROM "EFS_5_Tornadoes"')
        efs_5_data= cur.fetchall()
        con.close()
        return jsonify(efs_5_data)
    except Exception as e:
        return jsonify({'error':str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)