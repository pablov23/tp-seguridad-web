Dependencias:
1. Python 3.11.4 (al instalar python se instala el gestor de bibliotecas "pip")
2. pip
3. pandas
4. requests

### Pasos obtención cuenta usuario contraseña. 
1. En el requirements.txt están las bibiliotecas que hay que instalar:

    ```sh
    pip install -r requirements.txt
    ```
2. Ejecutar el script:
    ```sh
    python loginPwnd.py
    ```
    
### Salida
Genera un json con todas las contraseñas probadas y un campo "exito" indicando con un booleano si el login fue exitoso.

Si pide alguna biblioteca extra, se instala con pip install nombreBiblioteca