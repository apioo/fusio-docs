---
sidebar_position: 3
---

# Nginx

If you use Nginx as web server we provide the following sample nginx config:

```
server {
    listen       80;
    server_name  api.acme.com;

    root /var/www/html/fusio/public;

    location ~ ^/apps/(.+)/ {
        index index.html index.php;
        try_files $uri $uri/ /apps/$1/index.html;
    }

    location /apps {
        index index.php;
    }

    location / {
        try_files $uri /index.php$is_args$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php-fpm.sock;
    }
}

```

The `/apps` and `^/apps/(.+)/` location are only needed to serve all apps. If you host them on a different domain you
can also remove those locations. At Fusio you then also need to configure the correct url i.e.:

```env
APP_URL="http://api.acme.com"
APP_APPS_URL="http://api.acme.com/apps"
```
