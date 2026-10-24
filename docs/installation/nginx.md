---
sidebar_position: 4
---

# Nginx

This guide explains how to serve Fusio with the Nginx web server and PHP-FPM. It assumes that you have completed
the [manual installation](./index.md#manual-installation) and placed Fusio at `/var/www/html/fusio`. The commands
are based on Ubuntu/Debian, on other systems the paths might differ.

## Step 1: Install PHP-FPM

Nginx can not execute PHP itself, it forwards PHP requests to PHP-FPM. Make sure PHP-FPM is installed and running,
i.e. through the package `php8.4-fpm`.

## Step 2: Create a server block

Create the file `/etc/nginx/sites-available/fusio` with the following content. Replace `api.acme.com` with your
domain:

```nginx
server {
    listen 80;
    server_name api.acme.com;

    root /var/www/html/fusio/public;

    # serve the apps, i.e. the backend app at /apps/fusio/
    location ~ ^/apps/(.+)/ {
        index index.html index.php;
        try_files $uri $uri/ /apps/$1/index.html;
    }

    location /apps {
        index index.php;
    }

    # forward all other requests to Fusio
    location / {
        try_files $uri /index.php$is_args$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.4-fpm.sock;
    }
}
```

The configuration contains the following parts:

* `root` must point to the `public/` folder of Fusio
* The `/apps` locations serve the installed apps like the backend app. Since the apps are single page applications,
  all unknown paths are forwarded to the `index.html` of the app. If you host the apps on a different domain you
  can remove those locations
* The `/` location forwards all API requests to the `index.php` of Fusio
* The `\.php$` location passes PHP files to PHP-FPM. Adjust the `fastcgi_pass` socket path to your PHP version,
  you can find it at `/run/php/`

## Step 3: Enable the site

```
sudo ln -s /etc/nginx/sites-available/fusio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

The `nginx -t` command checks your configuration for errors before you reload Nginx.

## Step 4: Configure the URL

Set the URL of your domain at the `.env` file of Fusio:

```env
APP_URL="http://api.acme.com"
APP_APPS_URL="http://api.acme.com/apps"
```

Now you can open `http://api.acme.com/apps/fusio/` to log in to the backend.

## HTTPS

For production you should serve Fusio through HTTPS. The easiest way is to use [Certbot](https://certbot.eff.org/)
which obtains a free certificate from Let's Encrypt and adjusts your Nginx configuration automatically:

```
sudo certbot --nginx -d api.acme.com
```

Afterwards, change the URLs at your `.env` file to `https://`.

## Troubleshooting

* **502 Bad Gateway**: Nginx can not reach PHP-FPM, check whether PHP-FPM is running and whether the socket path at
  `fastcgi_pass` is correct
* **The backend app shows a 404 after a page reload**: The `/apps` locations are missing, so Nginx does not forward
  the app routes to the `index.html`
* **Error messages about missing write permissions**: Make sure that the `cache/` and `log/` folders are writable
  by the PHP-FPM user, i.e. `sudo chown -R www-data: cache log`
