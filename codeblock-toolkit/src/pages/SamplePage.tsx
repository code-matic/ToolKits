import React, { useState, useRef } from 'react';
import Txt from '../components/DynamicText';
import DynamicInput from '../components/DynamicInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import prettier from 'prettier';
import parserYaml from 'prettier/parser-yaml';

const SamplePage: React.FC = () => {
  const [values, setValues] = useState({
    subnetName: "SUBNET_NAME",
    publicBaseUrl: "NEXT_PUBLIC_API_BASE_URL",
    networkName: 'NETWORK_NAME',
    applicationName: 'APPLICATION_NAME',
    region: 'REGION',
    environment: 'ENVIRONMENT',
    appProjectName: 'APP_PROJECT_NAME',
    projectId: 'PROJECT_ID'
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Helper function to replace DynamicInput fields with their values
  const extractDynamicInputValues = (text: string) => {
    const replacements: { [key: string]: string } = {
      '<DynamicInput field="publicBaseUrl" />': values.publicBaseUrl,
      '<DynamicInput field="applicationName" />': values.applicationName,
      '<DynamicInput field="projectId" />': values.projectId,
      '<DynamicInput field="appProjectName" />': values.appProjectName,
      '<DynamicInput field="environment" />': values.environment,
      '<DynamicInput field="region" />': values.region,
      // Add other dynamic input replacements as needed
    };

    // Replace dynamic inputs in the text
    return text.replace(/<DynamicInput[^>]+>/g, (match) => replacements[match] || match);
  };

  const handleCopyAllClick = async () => {
    if (containerRef.current) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = containerRef.current.innerHTML;

      // Remove unwanted elements (e.g., icons)
      const icons = tempDiv.querySelectorAll('.edit-icon');
      icons.forEach((icon) => icon.remove());

      // Extract plain text and replace dynamic inputs with actual values
      const textToCopy = Array.from(tempDiv.childNodes)
        .map((node: ChildNode) => (node as HTMLElement).innerText)
        .join('\n')
        .replace(/\s+/g, ' ')
        .trim();

      const finalText = extractDynamicInputValues(textToCopy); // Replace dynamic inputs

      try {
        // Format the content as YAML using Prettier
        const formattedYaml = await prettier.format(finalText, {
          parser: 'yaml',
          plugins: [parserYaml],
          tabWidth: 2,
        });

        navigator.clipboard.writeText(formattedYaml).then(() => {
          toast.success("Copied to clipboard with proper formatting");
        });
      } catch (error) {
        toast.error("Error formatting content.");
        console.error("Prettier format error:", error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: '#f0f3f4', padding: '20px', borderRadius: '5px', position: 'relative', width: '100%', overflowX: 'auto' }}>
        <div style={{ width: '100%', justifyContent: 'flex-end', display: 'flex', cursor: 'pointer' }}>
          <button onClick={handleCopyAllClick} style={{ marginTop: '10px', border: 'none', outline: 'none' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-copy">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </button>
        </div>

        <div ref={containerRef}>
          <p className="mb-4">
            <Txt>steps: </Txt>
            <Txt tab={1}>- id: create-env</Txt>
            <Txt tab={1.5}>name: 'ubuntu'</Txt>
            <Txt tab={1.5}>entrypoint: 'bash'</Txt>
            <Txt tab={1.5}>args:</Txt>
            <Txt tab={2}>- '-c'</Txt>
            <Txt tab={2}>- | </Txt>
            <Txt tab={2}>
              <Txt tab={.5} endSpace={0}>echo "NEXT_PUBLIC_API_BASE_URL=$</Txt>
              <DynamicInput field="publicBaseUrl" stateValues={[values, setValues]} />
              <Txt title='>>' endSpace={0}></Txt>
              <Txt>/storage/.env</Txt>
            </Txt>
            {/* Other Txt and DynamicInput */}
            <Txt tab={1.5}>volumes:</Txt> 
            <Txt tab={1.5}>- name: 'myvolume'</Txt>
            <Txt tab={2}>path: '/storage'</Txt>

            <Txt tab={1}>- id: build-image</Txt>
            <Txt tab={1.5}>name: "gcr.io/cloud-builders/docker"</Txt> 
            <Txt tab={1.5}>entrypoint: 'bash'</Txt>
            <Txt tab={1.5}>args:</Txt>
            <Txt tab={2}>[</Txt>
            <Txt tab={2.5}>'-c',</Txt>
            <Txt tab={2.5}>
              "cp /storage/.env ./
              <DynamicInput field="applicationName" stateValues={[values, setValues]}/>
              /.env && docker build -t eu.gcr.io/<DynamicInput field="projectId" stateValues={[values, setValues]}/>/
              <DynamicInput field="appProjectName" stateValues={[values, setValues]}/>
              -
              <DynamicInput field="applicationName" stateValues={[values, setValues]}/>
              -
              <DynamicInput field="environment" stateValues={[values, setValues]}/>
              :$SHORT_SHA ./
              <DynamicInput field="applicationName" stateValues={[values, setValues]}/>
              ",
            </Txt>
            <Txt tab={2}>]</Txt>

            <Txt tab={1}>- id: push-image</Txt>
            <Txt tab={1.5}>name: "gcr.io/cloud-builders/docker"</Txt> 
            <Txt tab={1.5}>args:</Txt>
            <Txt tab={2}>[</Txt>
            <Txt tab={2.5}>'push',</Txt>
            <Txt tab={2.5}>
              'eu.gcr.io/<DynamicInput field="projectId" stateValues={[values, setValues]}/>/
              <DynamicInput field="appProjectName" stateValues={[values, setValues]}/>
              -
              <DynamicInput field="applicationName" stateValues={[values, setValues]}/>
              -
              <DynamicInput field="environment" stateValues={[values, setValues]}/>
              :$SHORT_SHA',
            </Txt>
            <Txt tab={2}>]</Txt>

            <Txt tab={1}>- id: deploy-image</Txt>
            <Txt tab={1.5}>name: "gcr.io/google.com/cloudsdktool/cloud-sdk"</Txt> 
            <Txt tab={1.5}>entrypoint: gcloud</Txt>
            <Txt tab={1.5}>args:</Txt>
            <Txt tab={2}>[</Txt>
            <Txt tab={2.5}>'run', 'deploy',</Txt>
            <Txt tab={2.5}>
              '<DynamicInput field="appProjectName" stateValues={[values, setValues]}/>
              -
              <DynamicInput field="applicationName" stateValues={[values, setValues]}/>
              -
              <DynamicInput field="environment" stateValues={[values, setValues]}/>', 
              '--image', 'eu.gcr.io/<DynamicInput field="projectId" stateValues={[values, setValues]}/>/
              <DynamicInput field="appProjectName" stateValues={[values, setValues]}/>
              -
              <DynamicInput field="applicationName" stateValues={[values, setValues]}/>
              -
              <DynamicInput field="environment" stateValues={[values, setValues]}/>
              :$SHORT_SHA;',
            </Txt>
            <Txt tab={2.5}>
              '--region', '<DynamicInput field="region" stateValues={[values, setValues]}/>', '--allow-unauthenticated', '--cpu=2', '--memory=2Gi', '--cpu-boost', '--timeout=500s'</Txt>
            <Txt tab={2}>]</Txt>

            <Txt tab={1}>images: ['eu.gcr.io/<DynamicInput field="projectId" stateValues={[values, setValues]}/>/
              <DynamicInput field="appProjectName" stateValues={[values, setValues]}/>
              -
              <DynamicInput field="applicationName" stateValues={[values, setValues]}/>
              -
              <DynamicInput field="environment" stateValues={[values, setValues]}/>
              :$SHORT_SHA;']</Txt>


            </p>

          </div>
        </div>

      
      <ToastContainer
        position="bottom-left"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
};

export default SamplePage;
