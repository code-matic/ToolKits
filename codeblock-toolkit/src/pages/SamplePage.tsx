import React, { useState, useRef } from 'react';
import Txt from '../components/DynamicText';
import DynamicInput from '../components/DynamicInput';

interface ChildComponentProps {
  // onValsuesUpdate: (updatedValues: { subnetName: string ; range: string | string[]; networkName: string; region: string }) => void;
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

      const icons = tempDiv.querySelectorAll('.edit-icon');
      icons.forEach((icon) => icon.remove());

      const range = document.createRange();
      range.selectNodeContents(tempDiv);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }

      navigator.clipboard.writeText(tempDiv.innerText);
      alert('Copied to clipboard!');
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
            <Txt tab={2}>
              <Txt>
                <Txt tab={.5} endSpace={0}>echo "NEXT_PUBLIC_PARENTYN_API_BASE_URL=$</Txt>
              </Txt>
              <DynamicInput field="range" stateValues={[values, setValues]}/>
              <Txt title='>>' endSpace={0}></Txt>
              <Txt>/storage/.env</Txt>
              <DynamicInput field="range" stateValues={[values, setValues]}/>

            </Txt>
            <Txt tab={1.5}>volumes: 'ubuntu'</Txt> 
            <Txt tab={1.5}>- name: 'myvolume'</Txt>
            <Txt tab={2}>path: '/storage'</Txt>
         
            </p>

          </div>
        </div>
      </div>
  );
};

export default SamplePage;
