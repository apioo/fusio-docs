---
sidebar_position: 3
---

# Apache

This guide explains how to serve Fusio with the Apache web server. It assumes that you have completed the
[manual installation](./index.md#manual-installation) and placed Fusio at `/var/www/html/fusio`. The commands are
based on Ubuntu/Debian, on other systems the paths might differ.

## Step 1: Enable the required modules

Fusio needs `mod_rewrite` to forward all requests to the `index.php` file:

```
sudo a2enmod rewrite
```

Apache also needs to execute PHP, i.e. through `mod_php` (package `libapache2-mod-php`) or PHP-FPM.

## Step 2: Create a virtual host

Create the file `/etc/apache2/sites-available/fusio.conf` with the following content. Replace `api.acme.com`
with your domain:

```apacheconf
<VirtualHost *:80>
    ServerName api.acme.com
    DocumentRoot /var/www/html/fusio/public

    <Directory /var/www/html/fusio/public>
        Options FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    LogLevel warn
    ErrorLog ${APACHE_LOG_DIR}/fusio.error.log
    CustomLog ${APACHE_LOG_DIR}/fusio.access.log combined
</VirtualHost>
```

The important part is that the `DocumentRoot` points to the `public/` folder and that `AllowOverride All` is set.
The `public/` folder contains an `.htaccess` file with the following rules:

```apacheconf
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/apps/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule (.*) index.php/$1 [L]

RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
```

The first block forwards all requests, except the apps, to Fusio. The second block passes the `Authorization`
header to PHP, which Apache otherwise removes. Without this rule your API can not authenticate requests.

:::tip
For better performance you can also set `AllowOverride None` and copy the rules of the `.htaccess` file
directly into the `<Directory>` block of your virtual host.
:::

## Step 3: Enable the site

```
sudo a2ensite fusio
sudo systemctl reload apache2
```

## Step 4: Configure the URL

Set the URL of your domain at the `.env` file of Fusio:

```env
APP_URL="http://api.acme.com"
APP_APPS_URL="http://api.acme.com/apps"
```

Now you can open `http://api.acme.com/apps/fusio/` to log in to the backend.

## HTTPS

For production you should serve Fusio through HTTPS. The easiest way is to use [Certbot](https://certbot.eff.org/)
which obtains a free certificate from Let's Encrypt and adjusts your Apache configuration automatically:

```
sudo certbot --apache -d api.acme.com
```

Afterwards, change the URLs at your `.env` file to `https://`.

## Troubleshooting

* **All endpoints return 404**: `mod_rewrite` is not enabled or `AllowOverride` is not set to `All`, so the
  `.htaccess` file is ignored
* **Protected endpoints return 401 although you send a token**: The `Authorization` header is not passed to PHP,
  check whether the rewrite rule for `HTTP_AUTHORIZATION` is active
* **Error messages about missing write permissions**: Make sure that the `cache/` and `log/` folders are writable
  by the Apache user, i.e. `sudo chown -R www-data: cache log`
