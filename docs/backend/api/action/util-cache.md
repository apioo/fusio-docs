
# Util Cache

This action caches the response of the configured action so that further requests will not invoke the configured
action and only get the cached response. This can be useful for i.e. actions which execute complex SQL queries.

## Configuration

![util_cache](/img/backend/api/action/util_cache.png)

### Action

The Action to execute and which response should be cached. The action gets only invoked
in case there is no cache or the cache is expired.

### Expire

The number of seconds when the cache expires.

### Connection

Optional a connection to a Memcache or Redis service which is used for caching.

