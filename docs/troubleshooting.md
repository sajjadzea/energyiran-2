# JWT/RBAC Troubleshooting

## Expired Token
- **Cause:** The token is past its `exp` time and the server rejects it.
- **Fix:** Log in again to obtain a fresh token or adjust `JWT_EXPIRES_IN` in `.env` if appropriate.

## Missing Authorization Header
- **Cause:** Client request does not include `Authorization: Bearer <token>`.
- **Fix:** Ensure the header is sent exactly as required. // If you get "jwt malformed", check Authorization header format

## Role Mismatch
- **Cause:** User does not have a role listed in the RBAC middleware's allowed roles.
- **Fix:** Verify the user's `roles` array and the roles passed to `authorize()`.

### Cypress headless on CI
- Install Xvfb: `apt-get install xvfb`
- Or use: `npm run e2e` which now wraps with `xvfb-run -a`
- If you still see errors, verify that Chrome is installed or use Electron: `cypress run --headless --browser electron`
// If Cypress still fails, check that DISPLAY is set or switch to electron browser.
