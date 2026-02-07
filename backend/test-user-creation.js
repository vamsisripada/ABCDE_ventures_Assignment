import axios from 'axios';

const API_URL = 'http://localhost:5002/api';

const testUserCreation = async () => {
  console.log('========================================');
  console.log('Testing User Creation API');
  console.log('========================================\n');

  const testUsername = `testuser_${Date.now()}`;
  const testPassword = 'password123';

  try {
    console.log('1. Creating a new user...');
    console.log(`   Username: ${testUsername}`);
    console.log(`   Password: ${testPassword}\n`);

    const createResponse = await axios.post(`${API_URL}/users`, {
      username: testUsername,
      password: testPassword
    });

    console.log('✅ User Created Successfully!');
    console.log('Response:', JSON.stringify(createResponse.data, null, 2));
    console.log(`Status Code: ${createResponse.status}\n`);

    console.log('----------------------------------------\n');

    console.log('2. Login with the created user...\n');
    const loginResponse = await axios.post(`${API_URL}/users/login`, {
      username: testUsername,
      password: testPassword
    });

    console.log('✅ Login Successful!');
    console.log('Response:', JSON.stringify(loginResponse.data, null, 2));
    console.log(`Status Code: ${loginResponse.status}\n`);

    const token = loginResponse.data.token;

    console.log('----------------------------------------\n');

    console.log('3. Get current user info...\n');
    const userInfoResponse = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('✅ User Info Retrieved!');
    console.log('Response:', JSON.stringify(userInfoResponse.data, null, 2));
    console.log(`Status Code: ${userInfoResponse.status}\n`);

    console.log('----------------------------------------\n');

    console.log('4. Logout user...\n');
    const logoutResponse = await axios.post(`${API_URL}/users/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('✅ Logout Successful!');
    console.log('Response:', JSON.stringify(logoutResponse.data, null, 2));
    console.log(`Status Code: ${logoutResponse.status}\n`);

    console.log('========================================');
    console.log('All Tests Passed! ✅');
    console.log('========================================');

  } catch (error) {
    if (error.response) {
      console.error('❌ Error:', error.response.data);
      console.error('Status Code:', error.response.status);
    } else {
      console.error('❌ Error:', error.message);
    }
  }
};

testUserCreation();
