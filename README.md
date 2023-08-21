# Getting started
- Install dependencies
```
npm install
```
- Start server
```
npm run build && npm start
```
- The server will run at http://localhost:6060

# API endpoints

### POST /auth/login
- Verify `email` and `password` from request body
- Content-Type if form urlencoded
- Response user profile as body
- Attach http-only cookie `access_token` as JWT from user profile

### POST /auth/logout
- Delete http-only cookie `access_token`

### GET /test
- To check if the request contains credentials after login

# Note
- Login API returns user profile instead of welcome message as the app use httpOnly cookie as credential.
  (It's unable to access httpOnly cookie from client-side script. So user profile have to be in the response body.)
  - Local storage is vulnerable to XSS attack
- Not yet ready for production
- Not yet include unit-test
