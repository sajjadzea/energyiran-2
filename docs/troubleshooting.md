# Troubleshooting

## UI and Test Issues
- **Forms not submitting**: Ensure `useAuth()` is passed to `LoginPage` and check browser console for errors.
- **Dashboard data not loading**: Verify API URL in `src/utils/api.js` and restart the dev server.
- **Cypress tests timing out**: Confirm the dev server runs on port 5173. If needed, increase `defaultCommandTimeout` in `cypress.config.js`.

## JWT/RBAC Troubleshooting
- **Expired Token**
  - **Cause:** The token is past its `exp` time and the server rejects it.
  - **Fix:** Log in again to obtain a fresh token or adjust `JWT_EXPIRES_IN` in `.env` if appropriate.
- **Missing Authorization Header**
  - **Cause:** Client request does not include `Authorization: Bearer <token>`.
  - **Fix:** Ensure the header is sent exactly as required. // If you get "jwt malformed", check Authorization header format
- **Role Mismatch**
  - **Cause:** User does not have a role listed in the RBAC middleware's allowed roles.
  - **Fix:** Verify the user's `roles` array and the roles passed to `authorize()`.
