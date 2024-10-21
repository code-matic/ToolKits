import { useState, useEffect } from 'react';
import ConfigPage from './pages/ConfigPage';
import DynamicValuesEditor from './components/DynamicValuesEditor';
import FeedbackForm from './pages/FeedbackPage';
import { SiChatbot } from 'react-icons/si';
import UserGuidePage from './pages/UserGuidePage';

function App() {
  const [currentStep, setCurrentStep] = useState(0); // Start at 0 for the main flow
  const [appType, setAppType] = useState<'frontend' | 'backend' | null>(null);
  const [usesEnvVars, setUsesEnvVars] = useState<boolean>(false);
  const [runsMigrations, setRunsMigrations] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [flow, setFlow] = useState<'cloudbuild' | 'docker' | null>(null); // Track which flow the user selected

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
      case 0:
        // Only show the frontend/backend questions if the flow is Cloudbuild Configurator
        return flow === 'cloudbuild' ? (
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
        ) : (
          // Directly show the Docker flow content if Docker is selected
          renderDockerTemplatesFlow()
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
  if (appType === 'backend') {
    return (
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
    );
  } else {
    // Call handleNextStep and return a valid JSX element like null
    handleNextStep();
    return null;  // Return null as a valid JSX element
  }

         // Continue to Configurator or User Guide after backend selection
      case 3:
        return renderConfigurator();
      case 4:
        return (
          <UserGuidePage
            onBack={handlePreviousStep} // "Back to Configurator" button
            onSkipToConfigurator={skipToConfigurator} // "Skip to Configurator" button
          />
        );
      default:
        return renderConfigurator();
    }
  };

  const renderLandingPage = () => (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Welcome to CloudBuild Generator</h1>
      <div className="space-x-4">
        <button
          className="px-6 py-3 bg-[#2563EB] text-white rounded-md"
          onClick={() => { setFlow('cloudbuild'); setCurrentStep(0); }}
        >
          Cloudbuild Configurator
        </button>
        <button
          className="px-6 py-3 bg-[#2563EB] text-white rounded-md"
          onClick={() => { setFlow('docker'); setCurrentStep(-1); }} // Docker Templates flow skips straight to that page
        >
          Docker Templates
        </button>
      </div>
    </div>
  );

  const renderDockerTemplatesFlow = () => {
    // Sample Docker templates for various technologies
    const dockerTemplates = [
      { name: 'Vite.js', content: 'FROM node:latest\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["npm", "run", "dev"]' },
      { name: 'Next.js', content: 'FROM node:latest\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["npm", "start"]' },
      { name: 'Nest.js', content: 'FROM node:14\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["npm", "run", "start:prod"]' },
      { name: 'Python', content: 'FROM python:3.9\nWORKDIR /app\nCOPY . .\nRUN pip install -r requirements.txt\nCMD ["python", "app.py"]' },
      { name: 'Express.js', content: 'FROM node:latest\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["node", "server.js"]' },
      { name: 'Golang', content: 'FROM golang:latest\nWORKDIR /app\nCOPY . .\nRUN go build -o main .\nCMD ["./main"]' },
      { name: 'Gin', content: 'FROM golang:latest\nWORKDIR /app\nCOPY . .\nRUN go build -o main .\nCMD ["./main"]' },
    ];
  
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-6">Sample Docker Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {dockerTemplates.map((template, index) => (
            <div key={index} className="border rounded-md p-4">
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <pre className="bg-gray-100 p-2 overflow-auto rounded-md">{template.content}</pre>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

  const renderConfigurator = () => {
    return flow === 'cloudbuild' ? (
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
              onClick={() => setCurrentStep(4)}
              className="text-blue-500 underline ml-2"
            >
              Click here
            </button>
          </p>
        </div>

        <ConfigPage
          values={values}
          setValues={setValues}
          usesEnvVars={usesEnvVars}
          runsMigrations={runsMigrations}
          appType={appType || 'frontend'}
        />
      </>
    ) : (
      renderDockerTemplatesFlow()
    );
  };

  return (
    <section className="relative h-screen flex flex-col">
      <header className="text-center bg-white py-4">
        <h1 className="text-5xl font-bold text-[#2563EB]">CLOUDBUILD GENERATOR</h1>
      </header>

      {currentStep > 0 && (
        <button
          className="absolute top-16 left-6 md:left-8 lg:left-12 px-6 py-2 bg-white text-[#2563EB] rounded-md hover:bg-[#2563EB1A] border-2 border-[#2563EB]"
          onClick={handlePreviousStep}
        >
          Back
        </button>
      )}

      <div className="flex flex-grow items-center justify-center">
        <div className="max-w-screen-lg w-full p-4">
          {flow === null ? renderLandingPage() : renderStep()}
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
