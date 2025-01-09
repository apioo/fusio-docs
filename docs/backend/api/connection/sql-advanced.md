
# SQL Advanced

Creates a connection to a SQL server using a URL format. Please visit the official [documentation] for detailed
information about the URL format.

## URL

In the following some examples from the documentation.

 * `mysql://localhost:4486/foo?charset=UTF-8`
 * `pdo-mysql://localhost:4486/foo?charset=UTF-8`
 * `drizzle-pdo-mysql://localhost:4486/foo?charset=UTF-8`
 * `sqlite:///somedb.sqlite`
 * `sqlite:///:memory:`

[documentation]: https://www.doctrine-project.org/projects/doctrine-dbal/en/3.9/reference/configuration.html#connecting-using-a-url

## Implementation

* Library: https://github.com/doctrine/dbal
* Returns: `Doctrine\DBAL\Connection`
