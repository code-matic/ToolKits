import React from 'react';

interface DynamicValuesProps {
  values: {
    [key: string]: string;
  };
  setValues: React.Dispatch<React.SetStateAction<any>>;
  configType: 'frontend' | 'backend'; // To distinguish between frontend and backend
}

const DynamicValuesEditor: React.FC<DynamicValuesProps> = ({ values, setValues, configType }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Define fields for frontend and backend separately
  const frontendFields = ['dockerFilePath', 'projectId', 'appProjectName', 'applicationName', 'region', 'environment', 'envBucketUrl'];
  const backendFields = ['dockerFilePath', 'projectId', 'appProjectName', 'applicationName', 'region', 'environment', 'envBucketUrl'];

  // Dynamically choose fields based on configType
  const fieldsToDisplay = configType === 'frontend' ? frontendFields : backendFields;

  return (
    <div>
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
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default DynamicValuesEditor;
