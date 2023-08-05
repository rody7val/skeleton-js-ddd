# javascript-ddd-architecture
### Ejemplo de arquitectura hexagonal

## Instalar docker

```bash
apt update
apt install docker.io docker-compose
```

## Cloná el repo e instalar dependencias

```
git clone https://github.com/rody7val/javascript-ddd-architecture
cd javascript-ddd-architecture
docker-compose up -d
npm install
```

## Crear tabla

Identificá el nombre del contenedor, seguro es algo como "javascript-ddd-architecture_db_1":

```bash
docker-compose ps
```
Ahora entrá al contendor

```bash
docker exec -it [NOMBRE DEL CONTENEDOR] mysql -u root -p
```

Ingresá contraseña mysql, seleccioná la base de datos y finalmente crea una tabla:

```sql
USE changeMe;
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
```
Tener en cuenta que "changeMe" es el nobre de la tabla.

## Correr la aplicación

```bash
npm start
```