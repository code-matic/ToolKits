import { useState } from 'react';
import { google } from 'googleapis';

const CloudBuildTrigger = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [branchName, setBranchName] = useState('main');
  const [projectId, setProjectId] = useState('');
  const [imageName, setImageName] = useState('');
  const [triggerCreated, setTriggerCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateTrigger = async () => {
    try {
      // OAuth2 setup for Google Cloud Build API (ensure OAuth tokens are available)
      const oauth2Client = new google.auth.OAuth2(
        'YOUR_CLIENT_ID',
        'YOUR_CLIENT_SECRET',
        'YOUR_REDIRECT_URL'
      );
      oauth2Client.setCredentials({
        access_token: 'USER_ACCESS_TOKEN',
        refresh_token: 'USER_REFRESH_TOKEN',
      });

      const cloudbuild = google.cloudbuild('v1');

      // Define trigger configuration
      const triggerConfig = {
        description: 'Automated Cloud Build Trigger',
        triggerTemplate: {
          branchName,
          projectId,
          repoName: repoUrl
        },
        build: {
          steps: [
            {
              name: 'gcr.io/cloud-builders/docker',
              args: ['build', '-t', `gcr.io/${projectId}/${imageName}`, '.'],
            },
          ],
          images: [`gcr.io/${projectId}/${imageName}`],
        },
      };

      // Create the trigger via the Cloud Build API
      await cloudbuild.projects.triggers.create({
        projectId: projectId,
        requestBody: triggerConfig,
        auth: oauth2Client,
      });

      setTriggerCreated(true);
    } catch (error) {
      console.error('Error creating Cloud Build trigger:', error);
      setErrorMessage('Failed to create trigger. Check your input.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Create a Cloud Build Trigger</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-2">Repository URL:</label>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="https://github.com/user/repo"
          />
        </div>
        <div>
          <label className="block mb-2">Branch Name:</label>
          <input
            type="text"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="main"
          />
        </div>
        <div>
          <label className="block mb-2">Google Cloud Project ID:</label>
          <input
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="my-project-id"
          />
        </div>
        <div>
          <label className="block mb-2">Docker Image Name:</label>
          <input
            type="text"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="my-app-image"
          />
        </div>
        <button
          type="button"
          onClick={handleCreateTrigger}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Trigger
        </button>
      </form>

      {triggerCreated && <p className="text-green-500 mt-4">Trigger created successfully!</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default CloudBuildTrigger;
