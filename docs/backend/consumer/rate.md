---
sidebar_position: 4
---

# Rate

Through a rate it is possible to limit the amount of incoming requests to a threshold. If the threshold is reached, the
user receives a 429 HTTP status code. A rate can distinguish between authenticated and not authenticated calls. For
authenticated calls the request count is based on the app. For not authenticated calls it is based on the ip address.

![rate_create](/img/backend/consumer/rate_create.png)
