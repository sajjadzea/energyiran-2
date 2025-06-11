# Troubleshooting

## CORS Issues
- **Cause:** Frontend domain not allowed or incorrect headers.
- **Fix:** Ensure `cors()` is enabled and configured to accept the origin.

## JWT Expiration
- **Cause:** Token expired causing 401 errors.
- **Fix:** Refresh token or increase expiry time. Check `JWT_SECRET` in `.env` if verification fails.

## File Upload Errors
- **Cause:** Invalid file type or missing uploads folder.
- **Fix:** Verify file type is JSON or Excel. Ensure `/uploads` directory exists with proper permissions.
