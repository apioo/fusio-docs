---
sidebar_position: 3
---

# Generator

The generator panel provides a way to automatically generate operations, actions and schemas based on a specific input.

![development](/img/backend/development/database.png)

## File-Directory

Provide a directory on your server and the generator will create an endpoint to expose all files in the directory.

## Import-OpenAPI

Parses an OpenAPI specification and creates all operations, actions and schemas according to the specification. This
helps if you want to build an API for an OpenAPI specification.

## SQL-Database

Select a database and the generator will create a CRUD endpoint for every table in the database.

## SQL-Entity

Define a model definition with our editor and the generator creates a new table and fitting endpoints to CRUD
every entity.

## SQL-Table

Select a database and a table and the generator will create a CRUD endpoint for this table.
