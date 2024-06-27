---
sidebar_position: 2
---

# Apache

If you use Apache as web server we recommend to setup a virtual host at your sites-available folder which points to the
public folder of Fusio. The following contains a sample apache config:

```
<VirtualHost *:80>
    ServerName api.acme.com
    DocumentRoot /var/www/html/fusio/public

    <Directory /var/www/html/fusio/public>
        Options FollowSymLinks
        AllowOverride All
        Require all granted

        # rewrite
        RewriteEngine On
        RewriteBase /

        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule (.*) /index.php/$1 [L]

        RewriteCond %{HTTP:Authorization} ^(.*)
        RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
    </Directory>

    # log
    LogLevel warn
    ErrorLog ${APACHE_LOG_DIR}/fusio.error.log
    CustomLog ${APACHE_LOG_DIR}/fusio.access.log combined
</VirtualHost>
```

On a Ubuntu/Debian system you could place the config at `/etc/apache/sites-available/fusio.conf`. Through the command
`a2ensite fusio` you would activate the site.

You should enable the module `mod_rewrite` so that the `.htaccess` file in the public folder is used. It is also possible
to include the htaccess commands directly into the virtual host which also increases performance. The htaccess contains
an important rule which redirects the `Authorization` header to Fusio which is otherwise removed. If the .htaccess file
does not work please check whether the AllowOverride directive is set correctly i.e. to All.

At Fusio you then also need to configure the correct url i.e.:

```env
APP_URL="http://api.acme.com"
APP_APPS_URL="http://api.acme.com/apps"
```
