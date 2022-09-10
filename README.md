# Next.js OpenJira App

- Para correr localmente, se necesita la base de datos de mongoDB

```
docker-compose up -d
```

- MongoDB URL local:

```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno

Renombra el archivo **.env.example** a **.env**

## Instalar dependencias
```

yarn install
yarn dev
```

## Llena la base de datos con informacion de pruebas

Llamara

```
http://localhost/api/seed
```
