# User Registration API Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the system. This endpoint validates the input, hashes the password, creates a user in the database, and returns an authentication token along with the user data.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 5 characters.

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "type": "field",
        "msg": "Invalid Email",
        "path": "email",
        "location": "body"
      }
      // ...other errors
    ]
  }
  ```

### Missing Fields

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "All fields required"
  }
  ```

## Example Request

```bash
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---