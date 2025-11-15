---
sidebar_position: 1
---

# Docker

It is also possible to setup a Fusio system through docker. This has the advantage that you automatically get a complete
running Fusio system without configuration.

* GitHub: https://github.com/apioo/fusio-docker
* DockerHub: https://hub.docker.com/r/fusio/fusio

To setup the container you have to check out the repository and run the following command:

```
docker-compose up -d
```

This builds the Fusio system with a predefined backend account. The credentials are taken from the env variables
`FUSIO_BACKEND_USER`, `FUSIO_BACKEND_EMAIL` and `FUSIO_BACKEND_PW` in the `docker-compose.yml`. If you are planing to
run the container on the internet you MUST change these credentials.

Alternatively you can aso use this simple `docker-composer.yaml` configuration s.

```yaml
services:
  fusio:
    image: fusio/fusio
    restart: always
    environment:
      FUSIO_PROJECT_KEY: "42eec18ffdbffc9fda6110dcc705d6ce"
      FUSIO_CONNECTION: "pdo-mysql://fusio:61ad6c605975@mysql-fusio/fusio"
      FUSIO_BACKEND_USER: "test"
      FUSIO_BACKEND_EMAIL: "demo@fusio-project.org"
      FUSIO_BACKEND_PW: "test1234"
    links:
      - mysql-fusio
    ports:
      - "8080:80"

  mysql-fusio:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_RANDOM_ROOT_PASSWORD: "1"
      MYSQL_USER: "fusio"
      MYSQL_PASSWORD: "61ad6c605975"
      MYSQL_DATABASE: "fusio"
    volumes:
      - ./db:/var/lib/mysql
```
