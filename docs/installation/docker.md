---
sidebar_position: 2
---

# Docker

Docker is the easiest way to run Fusio. The official image contains a complete, preconfigured system: PHP, the Apache
web server, the backend app, the cronjobs and the background worker. You only need to provide a database.

* GitHub: [apioo/fusio-docker](https://github.com/apioo/fusio-docker)
* Docker Hub: [fusio/fusio](https://hub.docker.com/r/fusio/fusio)

## Requirements

You need [Docker](https://docs.docker.com/get-docker/) with Docker Compose installed on your machine.

## Quick start

### Step 1: Create a `docker-compose.yml`

Create a new folder and add a `docker-compose.yml` file with the following content. It starts Fusio together
with a MySQL database:

```yaml
services:
  fusio:
    image: fusio/fusio
    restart: always
    environment:
      FUSIO_PROJECT_KEY: "42eec18ffdbffc9fda6110dcc705d6ce"
      FUSIO_ENV: "prod"
      FUSIO_DEBUG: "false"
      FUSIO_CONNECTION: "pdo-mysql://fusio:61ad6c605975@mysql-fusio/fusio"
      FUSIO_BACKEND_USER: "test"
      FUSIO_BACKEND_EMAIL: "demo@fusio-project.org"
      FUSIO_BACKEND_PW: "test1234"
    links:
      - mysql-fusio
    ports:
      - "8080:80"

  mysql-fusio:
    image: mysql:9
    restart: always
    environment:
      MYSQL_RANDOM_ROOT_PASSWORD: "1"
      MYSQL_USER: "fusio"
      MYSQL_PASSWORD: "61ad6c605975"
      MYSQL_DATABASE: "fusio"
    volumes:
      - ./db:/var/lib/mysql
```

:::danger
The values above are only examples. Before you run the container on the internet you MUST change the project key,
the database password and the backend credentials.
:::

### Step 2: Start the containers

```
docker compose up -d
```

At the first start the container automatically creates the database tables and the backend account, this can
take a moment.

### Step 3: Log in

Open `http://localhost:8080/apps/fusio/` in your browser and log in with the backend credentials from your
`docker-compose.yml`, in this example `test` / `test1234`. Your API is available at `http://localhost:8080/`.

Now you are ready to build your first API, take a look at the [Getting started](/docs/bootstrap) page.

## Environment variables

The container is configured through environment variables. Besides the following variables, you can use all
settings of the [Configuration](./configuration) page with a `FUSIO_` prefix, i.e. `FUSIO_URL`, `FUSIO_APPS_URL`
or `FUSIO_MAILER`.

| Variable              | Description                                                                      |
|-----------------------|----------------------------------------------------------------------------------|
| `FUSIO_PROJECT_KEY`   | A secret key which is used i.e. to sign tokens, use a long random string        |
| `FUSIO_CONNECTION`    | The database connection                                                          |
| `FUSIO_BACKEND_USER`  | The username of the administrator account which is created at the first start   |
| `FUSIO_BACKEND_EMAIL` | The email of the administrator account                                           |
| `FUSIO_BACKEND_PW`    | The password of the administrator account                                        |

If you run Fusio on a public domain, you should also set `FUSIO_URL` and `FUSIO_APPS_URL`, i.e.:

```yaml
      FUSIO_URL: "https://api.acme.com"
      FUSIO_APPS_URL: "https://api.acme.com/apps"
```

## Production

For a production setup we recommend to run the container behind a reverse proxy like Nginx, Traefik or Caddy which
handles HTTPS. In this case set `FUSIO_TRUSTED_IP_HEADER` i.e. to `X-Forwarded-For` so that Fusio sees the real IP
of your clients, which is important i.e. for rate limiting.

The database data is stored at the `./db` volume, make sure to include this folder in your backups.

## Workers

If you want to write actions in Java, JavaScript, PHP or Python, you can additionally start a worker container
for the language. The [docker-compose.yml](https://github.com/apioo/fusio-docker/blob/main/docker-compose.yml) of
the repository contains a commented example for every worker. To enable a worker, add the service and set the
fitting variable at the Fusio container, i.e. `FUSIO_WORKER_JAVASCRIPT: "worker-javascript:9091"`. Fusio then
automatically creates the connection to the worker. More information at the [Worker](/docs/action/worker) page.

## MSSQL and Oracle

In case you want to connect Fusio to an MSSQL or Oracle database, use the `fusio/fusio:latest-mssql` or
`fusio/fusio:latest-oracle` image, which contain the fitting PHP extension.

## Update

To update Fusio, pull the latest image and recreate the container. The database is migrated automatically at startup:

```
docker compose pull
docker compose up -d
```
