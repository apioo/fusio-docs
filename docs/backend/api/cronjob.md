---
sidebar_position: 7
---

# Cronjob

Fusio provides a cronjob system which allows you to execute an action at a specific interval. To execute those cronjobs
Fusio uses the standard linux `cron` util.

![cronjob_create](/img/backend/api/cronjob_create.png)

## Installation

To execute those cronjobs you need to setup a single cronjob which invokes the Fusio command every minute s.

```
* * * * * bin/fusio cronjob > /tmp/cronjob.log 2>&1
```

Internally Fusio then invokes all configured entries. Note it is important that the user who invokes the cronjob command
has also the same environment variables and rights as the `www-data` user.
