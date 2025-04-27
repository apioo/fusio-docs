---
sidebar_position: 4
---

# Firewall

Through the firewall panel, it is possible to ban specific IPs to access your API. Fusio contains
also a fail2ban logic to automatically ban specific IPs in case they have produced too many error
responses.

## Configuration

### Name

The name of your firewall rule.

### Type

Whether to deny or allow the request.

### IP

The target IPv4 or IPv6.

### Expire

Optional a date at which the ban expires.

## Fail2ban

By default, Fusio contains a fail2ban logic to automatically ban specific IPs in case they have produced
too many client error responses. In case a user tries a brute force attack on the authorization endpoint, 
we automatically ban the IP for 5 minutes in case the user has produced more than 32 error responses.
You can adjust this behavior at the `configuration.php` file s.

    'fusio_firewall_ignoreip'  => [],
    'fusio_firewall_bantime'   => 'PT5M',
    'fusio_firewall_findtime'  => 'PT2M',
    'fusio_firewall_maxretry'  => 32,
    'fusio_firewall_codes'     => [],

### `fusio_firewall_ignoreip`

Optional an array of trusted IPs which are excluded from the fail2ban logic, this means they never
automatically get baned.

### `fusio_firewall_bantime`

The time window how long the IP should be banned.

### `fusio_firewall_findtime`

The time window in which we look for error responses.

### `fusio_firewall_maxretry`

The number of error responses which are allowed.

### `fusio_firewall_codes`

Optional a list of specific error codes which should be considered. In case you want to only handle i.e.
401 and 429 error codes you could use `[401, 429]` all other error codes like 400 are then ignored.
