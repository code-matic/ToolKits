import { useState } from 'react';
import FrontendPage from "./pages/frontendPage";
import BackendPage from "./pages/backendPage";
import DynamicValuesEditor from './components/DynamicValuesEditor';
import UserGuide from './pages/UserGuidePage';
import FeedbackForm from './pages/FeedbackPage';
import SamplePage from './pages/SamplePage';

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
    dockerFilePath: 'DOCKER_FILE_PATH',
  });

  const [backendValues, setBackendValues] = useState({
    applicationName: 'APPLICATION_NAME',
    region: 'REGION',
    environment: 'ENVIRONMENT',
    appProjectName: 'APP_PROJECT_NAME',
    projectId: 'PROJECT_ID',
    envBucketUrl: 'ENV_BUCKET_URL',
    dockerFilePath: 'DOCKER_FILE_PATH',
    migrationScriptPath: 'MIGRATION_SCRIPT_PATH',
  });

  const handleDropdown = (index: number) => {
    const activeIndex = tabIndex === index ? -1 : index;
    setTabIndex(activeIndex);
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
  }, {
    name: "Sample Page",
    component: (
      <SamplePage/>
    )
  }];

  return (
    <section className="relative"> {/* Added 'relative' to position the feedback button */}
      {/* Show the User Guide first */}
      {showUserGuide ? (
        <div className="border border-gray-500 w-[1200px] mx-auto mt-5 h-[100%] rounded-lg">
          <UserGuide />

          {/* Conditionally display the Feedback Form */}
          {showFeedback && (
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-[400px]">
              <FeedbackForm onClose={() => setShowFeedback(false)} /> {/* Pass onClose prop */}
            </div>
          )}

          {/* Proceed button to move to the main content */}
          <div className="text-center mt-6">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setShowUserGuide(false)}  // Hide User Guide and show the rest of the app
            >
              Proceed
            </button>
          </div>
        </div>
      
      ) : (
        <>
          {/* Dynamic Values Editor */}
          <div className="border border-gray-500 w-[1200px] mx-auto mt-5 h-[100%] rounded-lg">
            <DynamicValuesEditor
              values={tabIndex === 0 ? frontendValues : backendValues} // Display appropriate values
              setValues={tabIndex === 0 ? setFrontendValues : setBackendValues} // Set appropriate values
              configType={tabIndex === 0 ? 'frontend' : 'backend'} // Pass correct config type
            />
          </div>

          {/* Tabs for frontend and backend configuration */}
          <div className="border border-gray-500 w-[1200px] mx-auto mt-5 h-[100%] rounded-lg">
            <div className="flex border-b border-gray-500">
              {tabs.map((item, index) => (
                <button
                  key={index}
                  className={`${tabIndex === index ? "text-blue-500 border-blue-500 border-b-2" : ""} p-2 px-4 text-gray-500 font-medium hover:border-b-2 hover:border-gray-500`}
                  onClick={() => handleDropdown(index)}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="p-7">
              {tabs.map((tab, index) => (
                tabIndex === index && (
                  <div key={index}>
                    {tab.component ? tab.component : <div>{tab.name} Content goes here. No content specified</div>}
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Go Back to User Guide Button */}
          <div className="text-center mt-6">
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              onClick={() => setShowUserGuide(true)}  // Show User Guide again
            >
              Go Back to User Guide
            </button>
          </div>

          {/* Conditionally display the Feedback Form */}
          {showFeedback && (
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-[400px]">
              <FeedbackForm onClose={() => setShowFeedback(false)} /> {/* Pass onClose prop */}
            </div>
          )}
        </>
      )}

      {/* Provide Feedback Button at the bottom */}
      <button
        className="fixed bottom-5 right-5 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        onClick={() => setShowFeedback(!showFeedback)}  // Toggle feedback form
      >
        {showFeedback ? "Close Feedback" : "Provide Feedback"}
      </button>
    </section>
  );
}

export default App;
