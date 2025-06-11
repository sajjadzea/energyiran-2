# Troubleshooting

## OrientDB connection refused
- **Cause:** Database server not running or wrong host/port.
- **Fix:** Verify OrientDB server status and `.env` configuration.

## Class not found
- **Cause:** OrientDB schema missing required class.
- **Fix:** Run migration scripts to create classes. // If class creation fails, check migration script syntax

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
