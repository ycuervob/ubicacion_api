# Documentación de API REST en Node.js con Express y Sequelize 📃

Este API REST fue creado utilizando Node.js y utiliza Express para el manejo de las rutas y Sequelize para conectarse a la base de datos.

## Prerrequisitos ✅

Antes de comenzar, asegúrate de tener instalados los siguientes paquetes:

* Node.js
* Express
* Sequelize

## Configuración de la base de datos 💾

Para configurar la conexión a la base de datos, debes crear un archivo en la carpeta **database/config**. Este archivo debe estar estructurado de acuerdo a la documentación de Sequelize.

## Rutas 🔃

El API REST maneja dos métodos para la ruta "/": un POST y un GET.

### GET
El método GET retorna una lista de los últimos 10 datos enviados al servidor.

### POST
El método POST sirve para cargar datos en la base de datos. El modelo de la base de datos se especifica de acuerdo a la documentación de Sequelize en la carpeta database/models.

## Modelo de la base de datos 🤖

El modelo de la base de datos está especificado en la carpeta **database/models** siguiendo la documentación de Sequelize.

_Esta documentación fue creada por el modelo de lenguaje AI de OpenAI, ChatGPT._
