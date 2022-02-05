FROM httpd:2.4-alpine
MAINTAINER Christoph Kappestein <christoph.kappestein@apioo.de>
LABEL description="Fusio docs"
COPY ./build /usr/local/apache2/htdocs/
