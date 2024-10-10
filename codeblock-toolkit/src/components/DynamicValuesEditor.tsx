import React, { useState } from 'react';
import './DynamicValuesEditor.css'; // Import your custom CSS for tooltips

interface DynamicValuesProps {
  values: {
    [key: string]: string;
  };
  setValues: React.Dispatch<React.SetStateAction<any>>;
  configType: 'frontend' | 'backend'; // To distinguish between frontend and backend
}

const DynamicValuesEditor: React.FC<DynamicValuesProps> = ({ values, setValues, configType }) => {
  const [hoveredField, setHoveredField] = useState<string | null>(null); // To track hovered field

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Define fields for frontend and backend separately
  const frontendFields = ['projectId', 'appProjectName', 'applicationName', 'region', 'environment', 'envBucketUrl'];
  const backendFields = ['projectId', 'appProjectName', 'applicationName', 'region', 'environment', 'envBucketUrl', 'migrationScriptPath'];

  // Dynamically choose fields based on configType
  const fieldsToDisplay = configType === 'frontend' ? frontendFields : backendFields;

  // Sample values for tooltips
  const sampleValues: { [key: string]: string } = {
    envBucketUrl: 'envs_store_dev/parentyn/backend',
    migrationScriptPath: './migrate.sh',
    projectId: 'codematic-shared-environment',
    appProjectName: 'parentyn',
    applicationName: 'frontend',
    region: 'europe-west1',
    environment: 'development',
  };

  return (
    <div className="user-guide p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Edit {configType === 'frontend' ? 'Frontend' : 'Backend'} Dynamic Values</h2>
      <form className="grid grid-cols-2 gap-4 mb-8">
        {fieldsToDisplay.map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="font-medium capitalize">
              {key.replace(/([a-z])([A-Z])/g, '$1 $2')}:
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={values[key as keyof typeof values]} 
              onChange={handleChange}
              onMouseEnter={() => setHoveredField(key)} // Track hovered field
              onMouseLeave={() => setHoveredField(null)} // Reset on leave
              className="p-2 border border-[#2563EB] rounded-lg relative"
              data-tooltip={sampleValues[key] || 'No sample available'} // Use data attribute for custom tooltip
            />
            {/* Custom tooltip */}
            {hoveredField === key && (
              <div className="custom-tooltip">
                {sampleValues[key] || 'No sample available'}
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default DynamicValuesEditor;
