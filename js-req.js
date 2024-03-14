import http from 'http'; 
import fs from 'fs'; 

const postData = JSON.stringify({
  name: "this is some name", 
  field: "This is another field"
});

const options = {
  hostname: 'localhost',
  port: 4000, 
  path: '/curl-check', 
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options , (res) => {
  console.log('status-code', res.statusCode); 

  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Response:', responseData);
  });
}); 

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(postData); // Write the request body
req.end(); // End the request
