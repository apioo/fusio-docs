
# Worker Java

The Worker-Java executes the provided Groovy/Java code at the remote worker.
More information about the worker at: https://github.com/apioo/fusio-worker-java

## Example

```groovy
def connection = connector.getConnection("app");

def entries = [];
def query = "SELECT name, description FROM app_product_0";
try (def stmt = connection.createStatement()) {
    def rs = stmt.executeQuery(query);
    while (rs.next()) {
        entries.add([
            name: rs.getString("name"),
            description: rs.getString("description")
        ]);
    }
}

response.build(200, [:], [
    foo: "bar",
    entries: entries
]);

```

## Types

This table contains an overview which connection types are implemented
and which implementation is used:

| Type | Implementation 
| ---- | --------------
| `Fusio.Adapter.Sql.Connection.Sql` | `java.sql.Connection`
| `Fusio.Adapter.Sql.Connection.SqlAdvanced` | `java.sql.Connection`
| `Fusio.Adapter.Http.Connection.Http` | `org.apache.http.client.HttpClient`
| `Fusio.Adapter.Mongodb.Connection.MongoDB` | `com.mongodb.client.MongoDatabase`
| `Fusio.Adapter.Elasticsearch.Connection.Elasticsearch` | `org.elasticsearch.client.RestHighLevelClient`

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/Qra9SwFz7W4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
