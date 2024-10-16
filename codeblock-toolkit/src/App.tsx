import { useState, useEffect } from 'react';
import ConfigPage from './pages/ConfigPage';
import DynamicValuesEditor from './components/DynamicValuesEditor';
import FeedbackForm from './pages/FeedbackPage';
import { SiChatbot } from 'react-icons/si';
import UserGuidePage from './pages/UserGuidePage';

function App() {
  const [currentStep, setCurrentStep] = useState(-1); // Start at -1 for User Guide
  const [appType, setAppType] = useState<'frontend' | 'backend' | null>(null);
  const [usesEnvVars, setUsesEnvVars] = useState<boolean>(false);
  const [runsMigrations, setRunsMigrations] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [values, setValues] = useState({
    applicationName: 'APPLICATION_NAME',
    region: 'REGION',
    environment: 'ENVIRONMENT',
    appProjectName: 'APP_PROJECT_NAME',
    projectId: 'PROJECT_ID',
    dockerFilePath: 'DOCKER_FILE_PATH',
    envBucketUrl: '',
    migrationScriptPath: '',
  });

  useEffect(() => {
    setValues(prevValues => ({
      ...prevValues,
      envBucketUrl: usesEnvVars ? 'ENV_BUCKET_URL' : '',
      migrationScriptPath: appType === 'backend' && runsMigrations ? 'MIGRATION_SCRIPT_PATH' : '',
    }));
  }, [appType, usesEnvVars, runsMigrations]);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const skipToConfigurator = () => {
    setCurrentStep(0); // Go directly to the first question
  };

  const renderStep = () => {
    switch (currentStep) {
      case -1:
        return (
          <UserGuidePage
            onBack={skipToConfigurator} // "Back to Configurator" button
            onSkipToConfigurator={skipToConfigurator} // "Skip to Configurator" button
          />
        );
      case 0:
        return (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl mb-6">Are you running a frontend or a backend app?</h2>
            <div className="space-x-4">
              <button
                className="px-6 py-3 bg-[#2563EB] text-white rounded-md"
                onClick={() => { setAppType('frontend'); handleNextStep(); }}
              >
                Frontend
              </button>
              <button
                className="px-6 py-3 bg-[#2563EB] text-white rounded-md"
                onClick={() => { setAppType('backend'); handleNextStep(); }}
              >
                Backend
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl mb-6">Are you using environment variables?</h2>
            <div className="space-x-4">
              <button
                className="px-6 py-3 bg-[#2563EB] text-white rounded-md"
                onClick={() => { setUsesEnvVars(true); handleNextStep(); }}
              >
                Yes
              </button>
              <button
                className="px-6 py-3 bg-[#2563EB] text-white rounded-md"
                onClick={() => { setUsesEnvVars(false); handleNextStep(); }}
              >
                No
              </button>
            </div>
          </div>
        );
      case 2:
        return appType === 'backend' ? (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl mb-6">Are you using a migration step?</h2>
            <div className="space-x-4">
              <button
                className="px-6 py-3 bg-[#2563EB] text-white rounded-md"
                onClick={() => { setRunsMigrations(true); handleNextStep(); }}
              >
                Yes
              </button>
              <button
                className="px-6 py-3 bg-[#2563EB] text-white rounded-md"
                onClick={() => { setRunsMigrations(false); handleNextStep(); }}
              >
                No
              </button>
            </div>
          </div>
        ) : renderConfigurator();
      default:
        return renderConfigurator();
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('accessToken');
    if (token) {
      setAccessToken(token);
      console.log('Access token:', token); // You can store this in a secure way for further API calls.
    }
  }, []);

  // Function to upload the cloudbuild.yaml file
  const uploadCloudBuildFile = async () => {
    if (!accessToken) return;

    try {
      const owner = 'AyBims'; // Change this to your GitHub username or org
      const repo = 'LearnWebhookTest'; // Change this to your GitHub repository name

      const response = await fetch(`http://localhost:3000/repos/${owner}/${repo}/contents/cloudbuild.yaml`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);
      } else {
        console.error('Failed to upload file:', await response.text());
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      uploadCloudBuildFile(); // Trigger file upload once accessToken is available
    }
  }, [accessToken]);

  const renderConfigurator = () => {
    return (
      <>
        <DynamicValuesEditor
          values={values}
          setValues={setValues}
          configType={appType || 'frontend'}
          usesEnvVars={usesEnvVars}
          runsMigrations={runsMigrations}
        />

        <div className="text-center mt-6">
          <p className="text-lg">
            Want to learn more about the different dynamic values and how to derive them?
            <button
              onClick={() => setCurrentStep(-1)}
              className="text-blue-500 underline ml-2"
            >
              Click here
            </button>
          </p>
        </div>

        <button onClick={handleOAuthLogin}>Connect to GitHub</button>
        {accessToken && <p>Authenticated! Access token: {accessToken}</p>}

        <ConfigPage
          values={values}
          setValues={setValues}
          usesEnvVars={usesEnvVars}
          runsMigrations={runsMigrations}
          appType={appType || 'frontend'}
        />
      </>
    );
  };

  const handleOAuthLogin = () => {
    window.location.href = 'http://localhost:3000/auth/github';
  };

  const fetchRepositories = async () => {
    if (!accessToken) return;

    try {
      const response = await fetch('http://localhost:3000/repos', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const repos = await response.json();
      console.log('Repositories:', repos);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  // Call the function to fetch repositories
  useEffect(() => {
    fetchRepositories();
  }, [accessToken]);

  return (
    <section className="relative h-screen flex flex-col">
      <header className="text-center bg-white py-4">
        <h1 className="text-5xl font-bold text-[#2563EB]">CLOUDBUILD GENERATOR</h1>
      </header>

      {currentStep >= 0 && (
        <button
          className="absolute top-16 left-6 md:left-8 lg:left-12 px-6 py-2 bg-[#2563EB] text-white rounded-md"
          onClick={handlePreviousStep}
        >
          Back
        </button>
      )}

      <div className="flex flex-grow items-center justify-center">
        <div className="max-w-screen-lg w-full p-4">
          {renderStep()}
        </div>
      </div>

      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-8 right-5 px-6 py-3 bg-[#2563EB] text-white rounded-full hover:bg-[#1D4ED8] flex items-center space-x-2"
      >
        <SiChatbot className="text-white text-4xl" />
      </button>

      {showFeedbackForm && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md">
          <FeedbackForm onClose={() => setShowFeedbackForm(false)} />
        </div>
      )}
    </section>
  );
}

export default App;
