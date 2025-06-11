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

### Running Cypress in CI / Headless
- **Locally with Chrome**:
  ```bash
  npm run e2e
  ```
- **In CI (Electron)**:
  ```bash
  npm run e2e:ci
  ```
- **In CI with Chrome**:
  ```bash
  npm run e2e:chrome
  ```

#### Cypress CI: browser not found
**Symptom**: `The browser chrome is not installed.`
**Solution**:
  1. Run `npm run e2e:ci` to use Electron, which is bundled with Cypress.
  2. Or install Chrome in CI by running `npm run install:chrome` before `npm run e2e:chrome`.
