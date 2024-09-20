import React, { useState, useRef } from 'react';
import Txt from '../components/DynamicText';
import DynamicInput from '../components/DynamicInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ChildComponentProps {
  onValsuesUpdate?: (updatedValues: { subnetName: string ; range: string | string[]; networkName: string; region: string }) => void;
}

const SamplePage: React.FC<ChildComponentProps> = () => {
  const [values, setValues] = useState({
    subnetName:"SUBNET_NAME",
    range: "_NEXT_PUBLIC_PARENTYN_API_BASE_URL",
    networkName: 'NETWORK_NAME',
    region: 'REGION',
  });


  const containerRef = useRef<HTMLDivElement>(null);



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
        .join('\n'); // Join text with new lines

      // Copy the text to clipboard
      navigator.clipboard.writeText(textToCopy).then(() => {
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
          padding: '20px',
          borderRadius: '5px',
          position: 'relative',
          width: '100%',
          overflowX: 'auto',
        }}
      >
        <div
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            display: 'flex',
            cursor: 'pointer',
          }}
        >
          <button
            onClick={handleCopyAllClick}
            style={{ marginTop: '10px', border: 'none', outline: 'none' }}
          >
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

        {/* Gray Box */}
        <div ref={containerRef}>
          <p className="mb-4">
            <Txt>steps: </Txt>
            <Txt tab={1}>- id: create-env</Txt>
            <Txt tab={1.5}>name: 'ubuntu'</Txt> 
            <Txt tab={1.5}>entrypoint: 'bash'</Txt>
            <Txt tab={1.5}>args:</Txt>
            <Txt tab={2}>- '-c'</Txt>
            <Txt tab={2}>- | </Txt>
            <span>
            <Txt tab={2}>
              <Txt tab={.5} endSpace={0}>echo "NEXT_PUBLIC_PARENTYN_API_BASE_URL=$</Txt>
              <DynamicInput field="range" stateValues={[values, setValues]}/>
              <Txt title='>>' endSpace={0}></Txt>
            
              <Txt>/storage/.env</Txt>
              <DynamicInput field="range" stateValues={[values, setValues]}/>
            </Txt>
            </span>
            <Txt tab={1.5}>volumes: 'ubuntu'</Txt> 
            <Txt tab={1.5}>- name: 'myvolume'</Txt>
            <Txt tab={2}>path: '/storage'</Txt>
         
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




