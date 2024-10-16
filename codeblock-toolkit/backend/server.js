const express = require('express');
const axios = require('axios');
const path = require('path'); // Make sure to require 'path' if you're using it
const app = express();
const port = 3000;

// Your GitHub app's credentials
const clientID = 'Ov23liP0eipoYNCw1NYU';  // Replace with your actual client ID
const clientSecret = '2c127b20503e70b9a87b264b4d0a36fa5f10f801';  // Replace with your actual client secret

// Step 1: Redirect to GitHub for authorization
app.get('/auth/github', (req, res) => {
  const redirectUri = 'http://localhost:3000/auth/github/callback'; // Use your deployed URL in production
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=repo`;
  res.redirect(authUrl);
});

// Step 2: Handle the GitHub OAuth callback and upload cloudbuild.yaml
app.get('/auth/github/callback', async (req, res) => {
    const code = req.query.code;
    
  
    try {
      // Step 3: Exchange code for access token
      const tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: clientID,
          client_secret: clientSecret,
          code: code,
        },
        { headers: { Accept: 'application/json' } }
      );
  
      const accessToken = tokenResponse.data.access_token;
  
      if (!accessToken) {
        throw new Error('Access token not received');
      }
  
      console.log('Access Token:', accessToken); // Log the access token

      const rateLimit = await axios.get('https://api.github.com/rate_limit', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('Rate Limit:', rateLimit.data);
      
  
      // Step 4: Upload cloudbuild.yaml to the repository
      const owner = 'AyBims'; // Replace with your GitHub username or organization
      const repo = 'LearnWebhookTest'; // Replace with the actual GitHub repository name
      const filePath = path.join(__dirname, 'cloudbuild.yaml'); // Only the file name

      // Fetch the current file information (to get the sha if it exists)
      let currentSha;
      try {
        const fileResponse = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );
        currentSha = fileResponse.data.sha; // Get the sha of the existing file
      } catch (error) {
        // If the file doesn't exist, we'll just create it
        if (error.response && error.response.status !== 404) {
          throw error; // Re-throw if it's not a 404 error
        }
      }

      const fileContent = Buffer.from('helloworld').toString('base64'); // New content of the file
  
      // Create or update the file in the repository
      const createFileResponse = await axios.put(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
        {
          message: currentSha ? 'Update cloudbuild.yaml file' : 'Add cloudbuild.yaml file',
          content: fileContent,
          ...(currentSha && { sha: currentSha }), // Include sha only if the file exists
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
  
      console.log('File upload response:', createFileResponse.data); // Log the file upload response
  
      // Redirect to the frontend and include the access token in the query params
      res.redirect(`http://localhost:5173?accessToken=${accessToken}&fileUploaded=true`);
    } catch (error) {
      if (error.response) {
        console.error('GitHub API Error:', error.response.data); // Log detailed error response from GitHub
      } else {
        console.error('Error:', error.message); // Log the error message
      }
      res.status(500).send('Authentication or file upload failed');
    }
});
  
app.listen(port, () => {
  console.log(`OAuth backend running at http://localhost:${port}`);
});
