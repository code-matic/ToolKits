import { useState } from 'react';
import FrontendPage from "./pages/frontendPage";
import BackendPage from "./pages/backendPage";
import DynamicValuesEditor from './components/DynamicValuesEditor';
import UserGuide from './pages/UserGuidePage';

function App() {
  const [tabIndex, setTabIndex] = useState(0);

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
  }];

  return (
    <section>
      <div className="border border-gray-500 w-[1200px] mx-auto mt-5 h-[100%] rounded-lg">
        {/* User Guide */}
        <UserGuide />

        {/* Dynamic Values Editor */}
        <DynamicValuesEditor
          values={tabIndex === 0 ? frontendValues : backendValues} // Display appropriate values
          setValues={tabIndex === 0 ? setFrontendValues : setBackendValues} // Set appropriate values
          configType={tabIndex === 0 ? 'frontend' : 'backend'} // Pass correct config type
        />

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
    </section>
  );
}

export default App;
