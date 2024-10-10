import { useState } from 'react';
import { SiChatbot } from 'react-icons/si';
import FrontendPage from "./pages/frontendPage";
import BackendPage from "./pages/backendPage";
import DynamicValuesEditor from './components/DynamicValuesEditor';
import UserGuide from './pages/UserGuidePage';
import FeedbackForm from './pages/FeedbackPage';

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [showUserGuide, setShowUserGuide] = useState(true);  // State to toggle User Guide visibility
  const [showFeedback, setShowFeedback] = useState(false);   // State to toggle Feedback form visibility

  // State for dynamic values
  const [frontendValues, setFrontendValues] = useState({
    envBucketUrl: 'ENV_BUCKET_URL',
    applicationName: 'APPLICATION_NAME',
    region: 'REGION',
    environment: 'ENVIRONMENT',
    appProjectName: 'APP_PROJECT_NAME',
    projectId: 'PROJECT_ID',
  });

  const [backendValues, setBackendValues] = useState({
    applicationName: 'APPLICATION_NAME',
    region: 'REGION',
    environment: 'ENVIRONMENT',
    appProjectName: 'APP_PROJECT_NAME',
    projectId: 'PROJECT_ID',
    envBucketUrl: 'ENV_BUCKET_URL',
    migrationScriptPath: 'MIGRATION_SCRIPT_PATH',
  });

  const handleDropdown = (index: number) => {
    setTabIndex(index);
  };

  const tabs = [{
    name: "Frontend Configuration",
    component: (
      <FrontendPage 
        values={frontendValues} 
        setValues={setFrontendValues} // Pass setValues prop to update frontend values
      />
    )
  }, {
    name: "Backend Configuration",
    component: (
      <BackendPage 
        values={backendValues} 
        setValues={setBackendValues} // Pass setValues prop to update backend values
      />
    )
  }];

  return (
    <section className="relative"> {/* Added 'relative' to position the feedback button */}
      {/* Show the User Guide first */}
      <header className="text-center bg-white py-4">
        <h1 className="text-5xl font-bold text-[#2563EB]">CLOUDBUILD GENERATOR</h1>
      </header>

      {showUserGuide ? (
        <div className="max-w-screen-lg mx-auto mt-5 h-full rounded-lg p-4">
          <div className="flex justify-end mt-5">
            <button
              className="px-8 py-3 bg-white text-[#2563EB] rounded-md hover:bg-[#2563EB1A] border-2 border-[#2563EB]"
              onClick={() => setShowUserGuide(false)}  // Hide User Guide and show the rest of the app
            >
              Skip to Configurator
            </button>
          </div>
          
          <UserGuide />
          
          <div className="mt-5">
            <button
              className="px-8 py-3 bg-[#2563EB] text-white rounded-md hover:bg-blue-700 border-2 border-[#2563EB] mb-10"
              onClick={() => setShowUserGuide(false)}  // Hide User Guide and show the rest of the app
            >
              Proceed to Configurator
            </button>
          </div>

          {/* Provide Feedback Button at the bottom */}
          <button
            className="fixed bottom-8 right-5 px-6 py-3 bg-[#2563EB] text-white rounded-full hover:bg-[#1D4ED8] flex items-center space-x-2"
            onClick={() => setShowFeedback(!showFeedback)}  // Toggle feedback form
          >
            <span>
              <SiChatbot className="text-white text-xl" /> {/* Feedback Icon */}
            </span>
            <span>{showFeedback ? "Close Feedback" : "Provide Feedback"}</span>
          </button>

          {/* Conditionally display the Feedback Form */}
          {showFeedback && (
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md">
              <FeedbackForm onClose={() => setShowFeedback(false)} /> {/* Pass onClose prop */}
            </div>
          )}
        </div>
      
      ) : (
        <>
          <div className="max-w-screen-lg mx-auto mt-5 h-full rounded-lg p-4">
            <button
              className="px-8 py-3 bg-white text-[#2563EB] rounded-md hover:bg-[#2563EB1A] border-2 border-[#2563EB]"
              onClick={() => setShowUserGuide(true)}  // Show User Guide again
            >
              Go Back to User Guide
            </button>

            {/* Tabs for frontend and backend configuration */}
            <div className="mt-5">
              <div className="flex justify-between border-b border-gray-500">
                {tabs.map((item, index) => (
                  <button
                    key={index}
                    className={`${tabIndex === index 
                      ? "text-blue-500 border-blue-500 border-b-2 bg-[#2563EB1A]"  // Active tab gets background color
                      : "text-gray-500"
                    } p-2 px-4 font-medium flex-grow text-center`}  // flex-grow ensures equal width, text-center aligns the text
                    onClick={() => handleDropdown(index)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Values Editor */}
            <div className="mt-5">
              <DynamicValuesEditor
                values={tabIndex === 0 ? frontendValues : backendValues} // Display appropriate values
                setValues={tabIndex === 0 ? setFrontendValues : setBackendValues} // Set appropriate values
                configType={tabIndex === 0 ? 'frontend' : 'backend'} // Pass correct config type
              />
            </div>

            {/* Render the content from either FrontendPage or BackendPage */}
            <div className="mt-5">
              {tabs[tabIndex].component}
            </div>

            {/* Provide Feedback Button at the bottom */}
            <button
              className="fixed bottom-8 right-5 px-6 py-3 bg-[#2563EB] text-white rounded-full hover:bg-[#1D4ED8] flex items-center space-x-2"
              onClick={() => setShowFeedback(!showFeedback)}  // Toggle feedback form
            >
              <SiChatbot className="text-white text-4xl" /> {/* Feedback Icon */}
            </button>

            {/* Conditionally display the Feedback Form */}
            {showFeedback && (
              <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md">
                <FeedbackForm onClose={() => setShowFeedback(false)} /> {/* Pass onClose prop */}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default App;
