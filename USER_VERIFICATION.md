# How to Verify User Creation

## Method 1: API Response (Recommended)

When you create a user via `POST /api/users`, you'll receive a detailed response:

### Request:
```bash
curl -X POST http://localhost:5002/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"alice_smith","password":"secure123"}'
```

### Successful Response (Status 201):
```json
{
  "message": "User created successfully",
  "user": {
    "userId": "6986bd595cdd8cae72836cd5",
    "username": "alice_smith",
    "createdAt": "2026-02-07T04:19:37.818Z"
  }
}
```

### If User Already Exists (Status 400):
```json
{
  "error": "Username already exists"
}
```

## Method 2: Login After Creation

Verify the user can login successfully:

```bash
curl -X POST http://localhost:5002/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice_smith","password":"secure123"}'
```

### Successful Login Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "6986bd595cdd8cae72836cd5",
  "username": "alice_smith"
}
```

## Method 3: Use Frontend UI

1. Open http://localhost:3000
2. Click "Sign Up"
3. Enter username and password
4. If successful, you'll see "Account created! Please login."
5. Login with your credentials

## Method 4: Run Test Script

Use the automated test script:

```bash
cd /Users/vamsi/Documents/Assignment/backend
./test-user-creation.sh
```

This will:
- ✅ Create a new user (testuser123)
- ❌ Try to create the same user again (should fail)
- ✅ Login with the created user

## Method 5: Check MongoDB Database

Connect to MongoDB and view users:

```bash
mongosh
use shopping-cart
db.users.find().pretty()
```

Example output:
```json
{
  "_id": ObjectId("6986bd595cdd8cae72836cd5"),
  "username": "alice_smith",
  "password": "$2a$10$hashed_password_here",
  "token": null,
  "createdAt": ISODate("2026-02-07T04:19:37.818Z"),
  "updatedAt": ISODate("2026-02-07T04:19:37.818Z")
}
```

## Method 6: Check User Count

Get the total number of users:

```bash
mongosh shopping-cart --eval "db.users.countDocuments()"
```

## What Information You Get About New Users:

1. **userId**: Unique MongoDB ObjectId
2. **username**: The username they registered with
3. **createdAt**: Timestamp when account was created
4. **Message**: Confirmation message

## Security Notes:

- ❌ Password is NEVER returned in responses (it's hashed)
- ❌ Token is not set until user logs in
- ✅ Only userId, username, and createdAt are returned
