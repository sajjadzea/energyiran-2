# Troubleshooting

## Database connection refused
- **Cause:** PostgreSQL or MongoDB server not running or wrong host/port.
- **Fix:** Verify database services and `.env` configuration.

## Table or collection not found
- **Cause:** Schema missing required table or collection.
- **Fix:** Run migration scripts to create tables or collections. // If creation fails, check migration script syntax

## Upload permission denied
- **Cause:** `/uploads` directory not writable.
- **Fix:** Ensure the folder exists and has proper permissions.

## CORS Issues
- **Cause:** Frontend domain not allowed or incorrect headers.
- **Fix:** Ensure `cors()` is enabled and configured to accept the origin.

## JWT Expiration
- **Cause:** Token expired causing 401 errors.
- **Fix:** Refresh token or increase expiry time. Check `JWT_SECRET` in `.env` if verification fails.

## File Upload Errors
- **Cause:** Invalid file type or missing uploads folder.
- **Fix:** Verify file type is JSON or Excel. Ensure `/uploads` directory exists with proper permissions.
