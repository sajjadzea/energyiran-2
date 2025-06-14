# API Reference

## /register (POST)
**Endpoint:** `POST /register`

**Description:** Create a new user account.

### Request
- Headers:
  - `Content-Type: application/json`
- Body parameters:
  - `email` (string, required)
  - `password` (string, required)
  - `roles` (array of strings, optional)
- Example:
```json
{
  "email": "new@example.com",
  "password": "secret",
  "roles": ["admin"]
}
```

### Response
- Success: `201 Created`
```json
{
  "id": 1,
  "email": "new@example.com"
}
```
- Error: `409 Conflict` "User exists"

**Debug:** Ensure PostgreSQL is running and reachable.

## /login (POST)
**Endpoint:** `POST /login`

**Description:** Authenticate user and return a JWT token.

### Request
- Headers:
  - `Content-Type: application/json`
- Body parameters:
  - `email` (string, required)
  - `password` (string, required)
- Example:
```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

### Response
- Success: `200 OK`
```json
{
  "token": "<jwt>",
  "expiresIn": "1h"
}
```
- Error: `401 Unauthorized` "Authentication failed"

**Debug:** Check logs if a 500 occurs.

**Troubleshoot:** If you receive 401, verify `JWT_SECRET` and token payload.

## /admin-only (GET)
**Endpoint:** `GET /admin-only`

**Description:** Protected test route requiring the `admin` role.

### Request
- Headers:
  - `Authorization: Bearer <token>`
- No parameters.

### Response
- Success: `200 OK`
```json
{
  "message": "Welcome, admin!"
}
```
- Errors: `401 Unauthorized`, `403 Forbidden`

**Debug:** Ensure the user has the `admin` role in PostgreSQL.

## /api/graphs (GET)
**Endpoint:** `GET /api/graphs`

**Description:** Retrieve graph data stored in MongoDB.

### Request
- Headers:
  - `Authorization: Bearer <token>`
- Query parameters:
  - `start` (string, optional RID)
- Example:
`GET /api/graphs?start=#12:0`

### Response
- Success: `200 OK`
```json
{
  "data": [
    { "@rid": "#12:0" }
  ]
}
```
- Errors: `400 Bad Request`, `401 Unauthorized`, `500 Internal Server Error`

**Debug:** Check logs if a 500 occurs.

**Troubleshoot:** If you receive 401, verify `JWT_SECRET` and token payload.

## /api/upload (POST)
**Endpoint:** `POST /api/upload`

**Description:** Upload JSON or Excel file to parse and store graph data.

### Request
- Headers:
  - `Authorization: Bearer <token>`
  - `Content-Type: multipart/form-data`
- Form-Data:
  - `file` (file, required)
- Example:
Upload using a form with a `file` field.

### Response
- Success: `200 OK`
```json
{
  "filename": "166000-file.xlsx"
}
```
- Errors: `400 FileMissing`, `401 Unauthorized`, `500 Internal Server Error`

**Debug:** Check logs if a 500 occurs.

**Troubleshoot:** Ensure `/uploads` exists and writable. If you receive 401, verify JWT.

## /api/dashboard/data.json (GET)
**Endpoint:** `GET /api/dashboard/data.json`

**Description:** Retrieve dashboard metrics in JSON format.

### Request
- Headers:
  - `Authorization: Bearer <token>`
- No parameters.

### Response
- Success: `200 OK`
```json
{
  "metric": 123
}
```
- Errors: `401 Unauthorized`, `500 Internal Server Error`

**Debug:** Check logs if a 500 occurs.

**Troubleshoot:** If you receive 401, verify `JWT_SECRET` and token payload.
