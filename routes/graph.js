import { Router } from "express";
import axios from "axios";

const router = Router(); 

const tenantId = 'd9662eb9-ad98-4e74-a8a2-04ed5d544db6';
const clientId = '4b352710-bf92-4c23-aca5-bb34b3e3db71';
const clientSecret = 'eeI8Q~wPf-GwVoMcNEhsFhX4eVybZVD46_pzzaOO';
const graphApiEndpoint = 'https://graph.microsoft.com/v1.0/me';

async function getAccessToken() {
  try {
    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    const response = await axios.post(tokenEndpoint, {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://graph.microsoft.com/.default',
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.message, {error});
    throw error;
  }
}

async function getUserProfile(accessToken) {
  try {
    const response = await axios.get(graphApiEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('User Profile:', response.data);
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    throw error;
  }
}

async function main() {
  try {
    const accessToken = await getAccessToken();
    await getUserProfile(accessToken);
  } catch (error) {
    console.error('Main Error:', error.message);
  }
}

// main();


export default router; 