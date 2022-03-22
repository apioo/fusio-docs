
# SMTP

Creates a connection to a SMTP server.

## DSN

To configure a simple SMTP server you can use the following DSN:
`smtp://user:pass@smtp.example.com:25`

It is also possible to configure other transports to send mails. Please take a look at the symfony mailer documentation:
https://symfony.com/doc/current/mailer.html#using-built-in-transports

## Implementation

* Library: https://github.com/symfony/mailer
* Returns: `Symfony\Component\Mailer\Mailer`
