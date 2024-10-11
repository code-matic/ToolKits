import React, { useRef, useState } from 'react';
import Txt from '../components/DynamicText';
import DynamicInput from '../components/DynamicInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BackendPageProps {
  values: {
    envBucketUrl: string;
    applicationName: string;
    region: string;
    environment: string;
    appProjectName: string;
    projectId: string;
    dockerFilePath: string;
    migrationScriptPath: string;
  };
  setValues: React.Dispatch<React.SetStateAction<{
    envBucketUrl: string;
    applicationName: string;
    region: string;
    environment: string;
    appProjectName: string;
    projectId: string;
    dockerFilePath: string;
    migrationScriptPath: string;
  }>>;
}

const BackendPage: React.FC<BackendPageProps> = ({ values, setValues }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Questions
  const [usesEnvVars, setUsesEnvVars] = useState<null | boolean>(null); // Tracks whether environment variables are used
  const [runsMigrations, setRunsMigrations] = useState<null | boolean>(null); // Tracks whether migrations are needed

  const handleCopyAllClick = () => {
    if (containerRef.current) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = containerRef.current.innerHTML;

      // Remove unwanted elements (e.g., icons)
      const icons = tempDiv.querySelectorAll('.edit-icon');
      icons.forEach((icon) => icon.remove());

      // Get text content line by line from div and p tags
      const textToCopy = Array.from(tempDiv.childNodes)
        .map((node: ChildNode) => (node as HTMLElement).innerText)
        .join('\n');

      // Copy the text to clipboard
      navigator.clipboard.writeText(textToCopy.replace(/\u00A0/g, ' ')).then(() => {
        toast.success("Copied to clipboard");
      });
    }
  };




  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#f0f3f4',
          padding: '0', // Remove padding around the banner section
          borderRadius: '5px',
          position: 'relative',
          width: '100%',
          overflowX: 'auto',
        }}
      >


        <div style={{ padding: '20px' }}>
          <h4>Are you using environment variables in your application?</h4>
          <label>
            <input
              type="radio"
              name="envVariables"
              value="yes"
              onChange={() => setUsesEnvVars(true)}
            />
            Yes
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              name="envVariables"
              value="no"
              onChange={() => setUsesEnvVars(false)}
            />
            No
          </label>

          <h4>Are you running any migration in your application?</h4>
          <label>
            <input
              type="radio"
              name="migrationVariables"
              value="yes"
              onChange={() => setRunsMigrations(true)}
            />
            Yes
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              name="migrationVariables"
              value="no"
              onChange={() => setRunsMigrations(false)}
            />
            No
          </label>
        </div>

        {/* Conditionally render the rest based on the user's choice */}
        {usesEnvVars !== null && runsMigrations !==null && (
          <>

        {/* Your Output Banner and Copy Button */}
        <div className="w-full flex justify-between items-center bg-[#2563EB] text-white p-4 mb-4" 
          style={{ margin: '0', padding: '0 70px', height: '71px' }} // Added more padding for left and right
        >
          <h2 className="font-semibold">Your Output</h2> {/* Increased font size */}
          
          {/* Copy Text and Copy Button */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="font-semibold" style={{ marginRight: '10px' }}>Copy Text</span>
            <button
              onClick={handleCopyAllClick}
              style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32" // Increased button size
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-copy"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </button>
          </div>
        </div>


        {/* Gray Box with Padding for Code Block */}
        <div ref={containerRef} style={{ padding: '20px' }}>
          <p className="mb-4">
            <Txt>steps: </Txt>

            {usesEnvVars && (
              <>
                <Txt>- id: pull-env</Txt>
                <Txt tab={0.5}>name: 'gcr.io/cloud-builders/gsutil'</Txt> 
                <Txt tab={0.5}>args: [</Txt>
                <Txt tab={1}>'cp', 'gs://<DynamicInput field="envBucketUrl" stateValues={[values, setValues]} />/.env', './<DynamicInput field="applicationName" stateValues={[values, setValues]} />/.env']</Txt>
              </>
            )}

                <Txt>- id: build-image</Txt>
                <Txt tab={0.5}>name: "gcr.io/cloud-builders/docker"</Txt> 
                <Txt tab={0.5}>args: [</Txt>
                <Txt tab={1}>'build', '-t', 'eu.gcr.io/<DynamicInput field="projectId" stateValues={[values, setValues]} />
                  /<DynamicInput field="appProjectName" stateValues={[values, setValues]} />
                  -<DynamicInput field="applicationName" stateValues={[values, setValues]} />
                  -<DynamicInput field="environment" stateValues={[values, setValues]} />
                  :$SHORT_SHA', '-f', '<DynamicInput field="dockerFilePath" stateValues={[values, setValues]} />', './'
                </Txt>
                <Txt tab={0.5}>]</Txt>

                <Txt>- id: push-image</Txt>
                <Txt tab={0.5}>name: "gcr.io/cloud-builders/docker"</Txt> 
                <Txt tab={0.5}>args: [</Txt>
                <Txt tab={1}>'push',</Txt>
                <Txt tab={1}>
                  'eu.gcr.io/<DynamicInput field="projectId" stateValues={[values, setValues]} />
                  /<DynamicInput field="appProjectName" stateValues={[values, setValues]} />
                  -<DynamicInput field="applicationName" stateValues={[values, setValues]} />
                  -<DynamicInput field="environment" stateValues={[values, setValues]} />
                  :$SHORT_SHA'
                </Txt>
                <Txt tab={0.5}>]</Txt>

            {runsMigrations && (
              <>
                <Txt>- id: migration-job</Txt>
                <Txt tab={0.5}>name: 'gcr.io/cloud-builders/gcloud'</Txt> 
                <Txt tab={0.5}>args: ['run', 'jobs', 'execute', 'migration-job', '--project', '<DynamicInput field="projectId" stateValues={[values, setValues]} />', '--region', '<DynamicInput field="region" stateValues={[values, setValues]} />']</Txt>
              </>
            )}

                <Txt>- id: deploy-image</Txt>
                <Txt tab={0.5}>name: "gcr.io/google.com/cloudsdktool/cloud-sdk"</Txt> 
                <Txt tab={0.5}>entrypoint: gcloud</Txt>
                <Txt tab={0.5}>args: [</Txt>
                <Txt tab={1}>'run', 'deploy',</Txt>
                <Txt tab={1}>
                  '<DynamicInput field="appProjectName" stateValues={[values, setValues]} />
                  -<DynamicInput field="applicationName" stateValues={[values, setValues]} />
                  -<DynamicInput field="environment" stateValues={[values, setValues]} />', 
                  '--image', 'eu.gcr.io/<DynamicInput field="projectId" stateValues={[values, setValues]} />
                  /<DynamicInput field="appProjectName" stateValues={[values, setValues]} />
                  -<DynamicInput field="applicationName" stateValues={[values, setValues]} />
                  -<DynamicInput field="environment" stateValues={[values, setValues]} />
                  :$SHORT_SHA',
                </Txt>
                <Txt tab={1}>
                  '--region', '<DynamicInput field="region" stateValues={[values, setValues]} />', '--allow-unauthenticated', '--cpu=2', '--memory=2Gi', '--cpu-boost', '--timeout=500s'
                </Txt>
                <Txt tab={0.5}>]</Txt>
            </p>
          </div>

        <ToastContainer />
        </>
        )}
      </div>
    </div>
  );
};

export default BackendPage;
