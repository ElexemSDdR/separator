# Separator
Separator es un script hecho para dividir en partes iguales una base de datos con formato MARC21 (en formato .txt) en varios archivos distintos con la misma cantidad de registros que se pueda.

## Función
Separator por ahora tiene hardcodeado los parámetros que usa, que sería:
- La base de datos (en formato .txt) para  dividir
- El destino a donde se van a quedar los archivos divididos
- La cantidad de registros que va a tener cada archivo individual

Con los parámetros puestos, el script va a corroborar que no exista la carpeta de destino (por default: "registros"), en caso de existir o haya una carpeta con el mismo nombre, pregunta al usuario si la quiere sobreescribir, en caso de que no simplemente la crea. Se prosigue leyendo la base de datos que se le pasa y comienza a separar cada tantos registros como se declare para poner ese total dentro de un nuevo archivo .txt que tendrá el rango especificado (si cada archivo debe tener 986 registros por ejemplo, el primero va a ir desde el registro 1 al 986, el segundo del 987 al 1973 y así sucesivamente); puede pasar que el último archivo llegue a tener menos registros que los anteriores si la división de la base entera por la cantidad de registros necesarios en cada archivo no es exacta, así que a tener en cuenta eso. Finalmente deposita todos los archivos en la carpeta creada al principio y termina la ejecución.
