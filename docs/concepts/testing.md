
# Testing

Fusio provides a complete Test-Setup for your API endpoints. In the `Fixture.php` class it is also possible to define
fixture data which is inserted for every test case. Please take a look at the tests of our
[sample cms repository](https://github.com/apioo/fusio-sample-cms/tree/master/tests) to see some live test examples.

The idea is that each endpoint has a corresponding test case class which tests the GET, POST, PUT and DELETE method of
the resource. Internally we can send an HTTP request to Fusio without the need to setup an HTTP server. This makes these
tests very fast and efficient.

The Method `Fixture::append` returns the data set which is inserted for every test case. There we insert a fixed access
token with the fitting rights so that we can call our protected API endpoints.

You can execute those tests inside the Fusio directory root with a simple phpunit command (because of the available
`phpunit.xml` configuration):

```
phpunit
```

## Development

Every test case should extend from the `ApiTestCase` class. The test case contains a test method for every HTTP method
i.e. `testGet`, `testPost`, etc. Every test makes the appropriated call to the API endpoint. Then we assert the response
body and if needed also the headers (for larger response bodies it is recommended to move the expected JSON payload to
an external file which is then included i.e. through `file_get_contents`). Through this way we can simply assure that our
API works as expected. The following shows a simple API test case from the example todo entity API endpoint:

```php
<?php

namespace App\Tests\Api\Page;

use App\Tests\ApiTestCase;
use PSX\Framework\Test\Environment;

class EntityTest extends ApiTestCase
{
    public function testGet()
    {
        $response = $this->sendRequest('/page/2', 'GET', [
            'User-Agent'    => 'Fusio TestCase',
        ]);

        $actual = (string) $response->getBody();
        $expect = file_get_contents(__DIR__ . '/resource/entity_get.json');

        $this->assertEquals(200, $response->getStatusCode(), $actual);
        $this->assertJsonStringEqualsJsonString($expect, $actual, $actual);
    }

    public function testPut()
    {
        $body     = json_encode(['refId' => 2, 'title' => 'foo', 'content' => 'barbar']);
        $response = $this->sendRequest('/page/2', 'PUT', [
            'User-Agent'    => 'Fusio TestCase',
            'Authorization' => 'Bearer ' . $this->accessToken
        ], $body);

        $actual = (string) $response->getBody();
        $expect = <<<'JSON'
{
    "success": true,
    "message": "Page successful updated",
    "id": 2
}
JSON;

        $this->assertEquals(200, $response->getStatusCode(), $actual);
        $this->assertJsonStringEqualsJsonString($expect, $actual, $actual);

        $actual = $this->connection->fetchAssociative('SELECT ref_id, title, content FROM app_page WHERE id = :id', ['id' => 2]);
        $expect = [
            'ref_id' => 2,
            'title' => 'foo',
            'content' => 'barbar',
        ];

        $this->assertEquals($expect, $actual);
    }

    public function testDelete()
    {
        $response = $this->sendRequest('/page/2', 'DELETE', [
            'User-Agent'    => 'Fusio TestCase',
            'Authorization' => 'Bearer ' . $this->accessToken
        ]);

        $actual = (string) $response->getBody();
        $expect = <<<'JSON'
{
    "success": true,
    "message": "Page successful deleted",
    "id": 2
}
JSON;

        $this->assertEquals(200, $response->getStatusCode(), $actual);
        $this->assertJsonStringEqualsJsonString($expect, $actual, $actual);

        $actual = $this->connection->fetchAssociative('SELECT id, title FROM app_page WHERE id = 2');
        $expect = null;

        $this->assertEquals($expect, $actual);
    }
}
```