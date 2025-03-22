
# Worker Java

The Worker-Java executes the provided Groovy/Java code at the remote worker.
More information about the worker at: https://github.com/apioo/fusio-worker-java

## Example

```java
import org.fusioproject.worker.runtime.generated.ExecuteRequest;
import org.fusioproject.worker.runtime.generated.ExecuteContext;
import org.fusioproject.worker.runtime.Connector;
import org.fusioproject.worker.runtime.ResponseBuilder;
import org.fusioproject.worker.runtime.Dispatcher;
import org.fusioproject.worker.runtime.Logger;

def handle(ExecuteRequest request, ExecuteContext context, Connector connector, ResponseBuilder response, Dispatcher dispatcher, Logger logger) {
    def connection = connector.getConnection("App");
    def filter = request.getArguments().get("filter");

    def query = "SELECT id, title, content, insert_date FROM my_blog";
    if (filter) {
        query += " WHERE title LIKE ?"
    }

    def entries = [];
    try (def ps = connection.prepareStatement(query)) {
        if (filter) {
            ps.setString(1, "%" + filter + "%");
        }

        def rs = ps.executeQuery();
        while (rs.next()) {
            entries.add([
                id: rs.getInt("id"),
                name: rs.getString("title"),
                description: rs.getString("content"),
                insertDate: rs.getString("insert_date")
            ]);
        }
    }

    return response.build(200, [:], [
        entries: entries
    ]);
}

```

## Types

This table contains an overview which connection types are implemented
and which implementation is used:

| Type | Implementation 
| ---- | --------------
| `Fusio.Adapter.Sql.Connection.Sql` | `java.sql.Connection`
| `Fusio.Adapter.Sql.Connection.SqlAdvanced` | `java.sql.Connection`
| `Fusio.Adapter.Http.Connection.Http` | `org.apache.hc.client5.http.impl.classic.HttpClient`
| `Fusio.Adapter.Mongodb.Connection.MongoDB` | `com.mongodb.client.MongoDatabase`
| `Fusio.Adapter.Elasticsearch.Connection.Elasticsearch` | `org.elasticsearch.client.RestHighLevelClient`
