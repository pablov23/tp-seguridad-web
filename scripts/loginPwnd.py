import json
import pandas as pd
import requests

def probarLogin(user,pwd):
    r = requests.post('http://localhost:5000/login', data={'username': user, 'password': pwd})
    if(r.status_code == 200):
        return r.status_code == 200

records = pd.read_csv('2023_pwned_users.csv').to_dict('records')

for record in records:
    resultado = probarLogin(record['username'],record['password'])
    if(resultado):
        record['exito'] = True
    else:
        record['exito'] = False

jsonFile = open('resultadosLogin.json', 'w+')
jsonFile.write(json.dumps(records))
jsonFile.close()