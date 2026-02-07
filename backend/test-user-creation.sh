#!/bin/bash

echo "========================================="
echo "Testing User Creation API"
echo "========================================="
echo ""

echo "1. Creating a new user..."
echo ""
curl -X POST http://localhost:5002/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser123","password":"password123"}' \
  -w "\n\nStatus Code: %{http_code}\n\n"

echo "2. Trying to create the same user again (should fail)..."
echo ""
curl -X POST http://localhost:5002/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser123","password":"password123"}' \
  -w "\n\nStatus Code: %{http_code}\n\n"

echo "3. Login with the created user..."
echo ""
curl -X POST http://localhost:5002/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser123","password":"password123"}' \
  -w "\n\nStatus Code: %{http_code}\n\n"

echo "========================================="
echo "Test Complete!"
echo "========================================="
