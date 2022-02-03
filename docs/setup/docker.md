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
