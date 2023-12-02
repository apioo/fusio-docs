
# Serialization

Fusio has a general mechanism to serialize the action response to the fitting format for a client. The serializer is
used in case the action returns an array or stdClass. It is also possible to return a string as response body but in
this case Fusio simply redirects this response.

Fusio respects also the HTTP `Accept` header. This means if the HTTP request contains i.e. the header
`Accept: application/xml` Fusio uses the XML serializer to generate a XML response from the data. By default Fusio uses
the JSON serializer. Besides the Accept header it is also possible to explicit define a serializer by using the format
query parameter i.e. `?format=xml`

## Custom writer

If you want to develop a custom serializer you can create a class which implements the `PSX\Data\WriterInterface`. This
class receives the raw data and needs to return a string. To add your custom class you need to add the writer to the
processor service at the `container.php` file:

```php
$services->set(\App\MyProcessorFactory::class);
$services->alias(\PSX\Framework\Data\ProcessorFactory::class, \App\MyProcessorFactory::class);
```

```php
namespace App;

class MyProcessorFactory
{
    private SchemaManager $schemaManager;

    public function __construct(SchemaManager $schemaManager)
    {
        $this->schemaManager = $schemaManager;
    }

    public function factory(): Processor
    {
        $phpWriter = new \App\Writer\Php();

        $config = Configuration::createDefault($this->schemaManager);
        $config->getWriterFactory()->addWriter($phpWriter);

        return new Processor($config);
    }
}
```

As example, we develop a custom writer which serializes the response data using the native PHP serialize function. In
reality this is not really useful since the format is not language independent, but it shows the general mechanism:

```php
namespace App\Writer;

class Php implements \PSX\Data\WriterInterface
{
    public function write($data)
    {
        return serialize($data);
    }

    public function isContentTypeSupported(\PSX\Http\MediaType $contentType)
    {
        return $contentType->getName() == 'application/php';
    }

    public function getContentType()
    {
        return 'application/php';
    }
}
```

Also at the `configuration.php` file you need to add the class to the allowed writer classes:

```
'psx_supported_writer'    => [
    \PSX\Data\Writer\Json::class,
    \PSX\Data\Writer\Jsonp::class,
    \PSX\Data\Writer\Jsonx::class,
    \App\Writer\Php::class,
],
```

Then it would be possible to use the writer by using the `Accept: application/php` header or the query parameter
`?format=php`.
