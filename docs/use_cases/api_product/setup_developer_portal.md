
# Setup Developer-Portal

The developer app provides an easy way to set up an API program where external developers can register to consume
your API. It provides a documentation page and login/registration system where new developers can register. 

![consumer](/img/use_cases/api_product/developer_portal.png)

## Installation

To install the developer app you need to go to the marketplace at the backend app. There you can install the developer
app.

![marketplace](/img/use_cases/api_product/marketplace.png)

## Customizing

It is also possible to adjust the content of the developer app via the page panel. It provides basic functionality to
edit and adjust the content to your needs.

![page](/img/use_cases/api_product/page.png)

## Settings

You also might want to take a look at the following settings which you can customize:

| Parameter               | Description                                             |
|-------------------------|---------------------------------------------------------|
| `mail_pw_reset_body`    | Body of the password reset mail                         |
| `mail_pw_reset_subject` | Subject of the password reset mail                      |
| `mail_register_body`    | Body of the register mail                               |
| `mail_register_subject` | Subject of the register mail                            |
| `points_default`        | The amount of points every new registered user receives |
| `recaptcha_key/secret`  | The Google recaptcha key and secret                     |
| `provider_*_key/secret` | To activate a social login provide a key and secret     |
| `role_default`          | The default role which every user receives              |
