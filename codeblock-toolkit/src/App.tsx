import { useState, useEffect } from 'react';
import ConfigPage from './pages/ConfigPage'; // Import the new ConfigPage component
import DynamicValuesEditor from './components/DynamicValuesEditor'; // Import your DynamicValuesEditor component
import FeedbackForm from './pages/FeedbackPage'; // Import your FeedbackForm component
import { SiChatbot } from 'react-icons/si';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [appType, setAppType] = useState<'frontend' | 'backend' | null>(null); // Allow null for initial state
  const [usesEnvVars, setUsesEnvVars] = useState<boolean>(false); // Track environment variable usage
  const [runsMigrations, setRunsMigrations] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false); // State for feedback form visibility

  // Configurator values for frontend and backend
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

  // Update values based on user selections
  useEffect(() => {
    setValues(prevValues => ({
      ...prevValues,
      envBucketUrl: usesEnvVars ? 'ENV_BUCKET_URL' : '', // Only if using env vars
      migrationScriptPath: appType === 'backend' && runsMigrations ? 'MIGRATION_SCRIPT_PATH' : '', // Only for backend if migrations are used
    }));
  }, [appType, usesEnvVars, runsMigrations]);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Render different questions based on the current step
  const renderStep = () => {
    switch (currentStep) {
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
        // Only ask the migration question if it's a backend app
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

  const renderConfigurator = () => {
    return (
      <>
        {/* Include Dynamic Values Editor for both Frontend and Backend */}
        <DynamicValuesEditor
          values={values}
          setValues={setValues}
          configType={appType || 'frontend'} // Use a default value
          usesEnvVars={usesEnvVars} // Pass the usesEnvVars state
          runsMigrations={runsMigrations} // Pass the runsMigrations state
        />
        <ConfigPage
          values={values}
          setValues={setValues}
          usesEnvVars={usesEnvVars}
          runsMigrations={runsMigrations}
          appType={appType || 'frontend'} // Use a default value
        />
      </>
    );
  };

  return (
    <section className="relative h-screen flex flex-col">
      <header className="text-center bg-white py-4">
        <h1 className="text-5xl font-bold text-[#2563EB]">CLOUDBUILD GENERATOR</h1>
      </header>

      {/* Back Button at the top left */}
      {currentStep > 0 && (
        <button
          className="absolute top-16 left-6 md:left-8 lg:left-12 px-6 py-2 bg-[#2563EB] text-white rounded-md"
          onClick={handlePreviousStep}
        >
          Back
        </button>
      )}

      {/* Centering the content */}
      <div className="flex flex-grow items-center justify-center">
        <div className="max-w-screen-lg w-full p-4">
          {renderStep()} {/* This renders the current question or the configurator */}
        </div>
      </div>

      {/* Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-8 right-5 px-6 py-3 bg-[#2563EB] text-white rounded-full hover:bg-[#1D4ED8] flex items-center space-x-2"
      >
        <SiChatbot className="text-white text-4xl" /> {/* Feedback Icon */}
      </button>

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md">
          <FeedbackForm onClose={() => setShowFeedbackForm(false)} />
        </div>
      )}
    </section>
  );
}

export default App;
