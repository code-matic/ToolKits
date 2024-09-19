import React, { useState, useRef } from 'react';
import DynamicText from './dynamicText';
import DynamicInput from './dynamicInput';

interface ChildComponentProps {
  onValuesUpdate: (updatedValues: { subnetName: string ; range: string | string[]; networkName: string; region: string }) => void;
}

const CodeBlock: React.FC<ChildComponentProps> = ({ onValuesUpdate }) => {
  const [values, setValues] = useState({
    subnetName:"SUBNET_NAME",
    range: "admin-frontend-web",
    networkName: 'NETWORK_NAME',
    region: 'REGION',
  });




  const [editingField, setEditingField] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFieldChange = (field: keyof typeof values, newValue: string) => {
    const updatedValues = {
      ...values,
      [field]: newValue,
    };

    setValues(updatedValues);
    onValuesUpdate(updatedValues);
    console.log(`${field}:`, newValue);
  };

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

          <p className="flex mb-4">
            <DynamicText title="gcloud compute networks subnets create  "/>
            <DynamicInput
              value={values.subnetName}
              field="subnetName"
              isEditing={editingField === 'subnetName'}
              onEdit={setEditingField}
              onChange={handleFieldChange}
              onBlur={() => setEditingField(null)}
              onCancel={() => setEditingField(null)}/>
            <span className='ml-2'>\</span>
          </p>

            <p className="flex mb-4">
              <DynamicText title="&nbsp;&nbsp;--range: "/>
              <DynamicInput
                value={values.range}
                field="range"
                isEditing={editingField === 'range'}
                onEdit={setEditingField}
                onChange={handleFieldChange}
                onBlur={() => setEditingField(null)}
                onCancel={() => setEditingField(null)}
              />
                <span className='ml-2'>\</span>
            </p>


            <p className="flex mb-4">
              <DynamicText title="&nbsp;&nbsp;--network= "/>
              <DynamicInput
                value={values.networkName}
                field="networkName"
                isEditing={editingField === 'networkName'}
                onEdit={setEditingField}
                onChange={handleFieldChange}
                onBlur={() => setEditingField(null)}
                onCancel={() => setEditingField(null)}
              />
              <span className='ml-2'>\</span>
            </p>


            <p className="flex mb-4">
              <DynamicText title="&nbsp;&nbsp;--region"/>
              <DynamicInput
                value={values.region}
                field="region"
                isEditing={editingField === 'region'}
                onEdit={setEditingField}
                onChange={handleFieldChange}
                onBlur={() => setEditingField(null)}
                onCancel={() => setEditingField(null)}
              />
              <span className='ml-2'>\</span>

            </p>

          </div>
        </div>
      </div>
  );
};

export default CodeBlock;
