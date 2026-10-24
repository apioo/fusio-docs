
# Form

The Form feature helps you to build a frontend UI to consume your API. It consists of two parts:

* At the backend an admin configures a form, which connects a target operation with an optional
  UI-Schema, s. [Backend Form](/docs/backend/consumer/form)
* At the frontend a user requests such a configured form through the consumer API and receives
  all information which is needed to render a form for the selected operation

Through this your frontend does not need to hardcode any forms, instead it can dynamically
render a form based on the configuration of the backend.

## Endpoints

The consumer API provides the following endpoints to obtain the configured forms.

| Method | Path                     | Description                                 |
|--------|--------------------------|---------------------------------------------|
| `GET`  | `/consumer/form`         | Returns a collection of all available forms |
| `GET`  | `/consumer/form/:form_id` | Returns the details of a specific form     |

## Form collection

Through `GET /consumer/form` you get a list of all available forms. You can use this list
i.e. to render a navigation or to let the user select a form.

## Form detail

Through `GET /consumer/form/1` you get the details of a specific form. The response contains
all information which your frontend needs to render an UI for the selected operation:

```json
{
    "id": 1,
    "status": 1,
    "name": "my_form",
    "action": "http://127.0.0.1/foo",
    "method": "POST",
    "jsonSchema": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "title": {
                "type": "string"
            },
            "content": {
                "type": "string"
            },
            "date": {
                "type": "string",
                "format": "date-time"
            }
        }
    },
    "uiSchema": {
        "foo": "bar"
    },
    "metadata": {
        "foo": "bar"
    }
}
```

| Property     | Description                                                                                                                    |
|--------------|--------------------------------------------------------------------------------------------------------------------------------|
| `id`         | The id of the form                                                                                                             |
| `status`     | The status of the form                                                                                                         |
| `name`       | The name of the form                                                                                                           |
| `action`     | The absolute URL of the target operation, your frontend sends the form data to this URL                                       |
| `method`     | The HTTP method of the target operation which your frontend uses to submit the form                                            |
| `jsonSchema` | The JSON Schema of the incoming request body of the target operation, it describes the data structure which the form produces |
| `uiSchema`   | The UI-Schema which was configured at the backend, it describes how the form should look                                       |
| `metadata`   | Optional metadata which was configured at the form                                                                             |

## Render a form

Fusio does not force you to use a specific UI-Schema format, you are free to choose the format which
fits your frontend. A common choice is [JSON Forms](https://jsonforms.io/), which can render a form
based on a JSON Schema and a UI-Schema and which is available for React, Angular and Vue.

The general flow to render and submit a form looks like:

1. Request the form details through `GET /consumer/form/:form_id`
2. Pass the `jsonSchema` and `uiSchema` to your form library to render the form
3. On submit send the form data as JSON body to the `action` URL using the provided `method`

The following example shows this flow using plain JavaScript:

```javascript
const response = await fetch('https://api.acme.com/consumer/form/1', {
    headers: {
        'Authorization': 'Bearer ' + accessToken
    }
});

const form = await response.json();

// render the form using your form library i.e. JSON Forms
// renderForm(form.jsonSchema, form.uiSchema, onSubmit);

async function onSubmit(data) {
    await fetch(form.action, {
        method: form.method,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
```

Note that the target operation is a regular operation of your API, this means if the operation is
not public the user needs an access token with the fitting scope to submit the form.
