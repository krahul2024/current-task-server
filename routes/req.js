import axios from "axios";
import fs from 'fs'; 
import { values } from '../config.js'; 

// const tenantId = values.tenant_id; 
// const clientId = values.app_id; 
// const clientSecret = values.secret_val; 

const graphApiEndpoint = 'https://graph.microsoft.com/v1.0/users?$top=500';

const accessToken = values.access_token; 
const headers = { Authorization: `Bearer ${accessToken}` };


const getUsers = async () => {
    try {
        const response = await axios.get(graphApiEndpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const users = response.data; // list of users
        fs.writeFile('usersList.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing users to file:', err);
            } else {
                console.log('List of users has been written to usersList.json');
            }
        });
    } catch (error) {
        console.log(error, error.response);
    }
}
// getUsers(); 


// ------------Searching for a person------------------------
const searchName = "ayush"; 
const outputPath = "response.js"; 
const responsePerPage = 25; 

async function searchUsers(searchTerm) {
    try {
        const searchUsersUrl = `https://graph.microsoft.com/v1.0/users?$top=${responsePerPage}&ConsistencyLevel=eventual&$search="displayName:${searchName}"`; 

        const response = await axios.get(searchUsersUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const results = response.data; 
        const resultJson = JSON.stringify(results, null, 4); 
        // write this data to the output file 
        fs.writeFile(outputPath, resultJson, (error) => {
            if(error) console.log('error writing to the file'); 
            else console.log('Succesfully written the output.')
        }); 
        return results; 
    
    } catch (error) {
        console.error("Failed to search for users:", error.response.data.error);
        throw error;
    }
}

// Example usage: Search for users with the search term "ayush"

searchUsers(searchName)
    .then(users => {
        console.log("Successfully fetched the users with ", searchName, " in their name.");
    })
    .catch(error => {
        console.error("Error:", error.message);
    });










// async function getAccessToken() {
//     try {
//       const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  
//       const params = new URLSearchParams();
//       params.append('grant_type', 'client_credentials');
//       params.append('client_id', clientId);
//       params.append('client_secret', clientSecret);
//       params.append('scope', 'https://graph.microsoft.com/.default');
  
//       const response = await axios.post(tokenEndpoint, params, {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       });
  
//       console.log(response); 
  
//       return response.data.access_token;
//     } catch (error) {
//       console.error('Error getting access token:', error.message, {Response : error?.response});
//       throw error;
//     }
//   }
  

// async function getUsers(accessToken) {
//   try {
//     const response = await axios.get(graphApiEndpoint, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     console.log('List of users:', response.data.value);
//   } catch (error) {
//     console.error('Error fetching list of users:', error.message);
//     throw error;
//   }
// }

// async function main() {
//   try {
//     const accessToken = await getAccessToken();
//     await getUsers(accessToken);
//   } catch (error) {
//     console.error('Main Error:', error.message);
//   }
// }

// main();
