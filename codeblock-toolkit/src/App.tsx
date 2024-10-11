import { useState, useEffect } from 'react';
import ConfigPage from './pages/ConfigPage'; // Import the new ConfigPage component
import DynamicValuesEditor from './components/DynamicValuesEditor'; // Import your DynamicValuesEditor component

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [appType, setAppType] = useState<'frontend' | 'backend' | ''>(''); // Updated type to include the specific types
  const [usesEnvVars, setUsesEnvVars] = useState<null | boolean>(null); // Track environment variable usage
  const [runsMigrations, setRunsMigrations] = useState(false);

  // Configurator values for frontend and backend
  const [values, setValues] = useState({
    applicationName: 'APPLICATION_NAME',
    region: 'REGION',
    environment: 'ENVIRONMENT',
    appProjectName: 'APP_PROJECT_NAME',
    projectId: 'PROJECT_ID',
    dockerFilePath: 'DOCKERFILE_PATH', // Set to undefined initially
    envBucketUrl: 'ENV_BUCKET_URL',
    migrationScriptPath: 'MIGRATION_SCRIPT_PATH',
  });

  // Update values based on user selections
  // useEffect(() => {
  //   setValues(prevValues => ({
  //     ...prevValues,
  //     envBucketUrl: usesEnvVars ? 'ENV_BUCKET_URL' : undefined,
  //     migrationScriptPath: appType === 'backend' && runsMigrations ? 'MIGRATION_SCRIPT_PATH' : undefined,
  //   }));
  // }, [appType, usesEnvVars, runsMigrations]);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Render different questions based on the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-xl mb-6">Are you running a frontend or a backend app?</h2>
            <div className="space-x-4">
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-md"
                onClick={() => { setAppType('frontend'); handleNextStep(); }}
              >
                Frontend
              </button>
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-md"
                onClick={() => { setAppType('backend'); handleNextStep(); }}
              >
                Backend
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-xl mb-6">Are you using environment variables?</h2>
            <div className="space-x-4">
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-md"
                onClick={() => { setUsesEnvVars(true); handleNextStep(); }}
              >
                Yes
              </button>
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-md"
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
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-xl mb-6">Are you using a migration step?</h2>
            <div className="space-x-4">
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-md"
                onClick={() => { setRunsMigrations(true); handleNextStep(); }}
              >
                Yes
              </button>
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-md"
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
          configType={appType} // Pass the appType for DynamicValuesEditor
          usesEnvVars={usesEnvVars} // Pass the usesEnvVars state
          runsMigrations={runsMigrations} // Pass the runsMigrations state
        />
        <ConfigPage
          values={values}
          setValues={setValues}
          usesEnvVars={usesEnvVars}
          runsMigrations={runsMigrations}
          appType={appType} // Pass the appType to ConfigPage
        />
      </>
    );
  };

  return (
    <section className="relative">
      <header className="text-center bg-white py-4">
        <h1 className="text-5xl font-bold text-[#2563EB]">CLOUDBUILD GENERATOR</h1>
      </header>

      <div className="max-w-screen-lg mx-auto mt-5 h-full rounded-lg p-4">
        {renderStep()} {/* This renders the current question or the configurator */}
      </div>
    </section>
  );
}

export default App;
