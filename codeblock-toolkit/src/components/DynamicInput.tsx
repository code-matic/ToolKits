import React from 'react';
import Editicon from '../icons/Edit.icon';


interface EditableFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stateValues: [{ [key: string]: any }, React.Dispatch<React.SetStateAction<any>>];
  field: 'subnetName' | 'range' | 'networkName' | 'region';
}

const DynamicInput: React.FC<EditableFieldProps> = ({
  stateValues,
  field,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [values, setValues] = stateValues;
  const handleBlur  = () => {
    setIsEditing(false);
  
  }

  const handleFieldChange = (field: keyof typeof values, newValue: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValues((e:any)=>({...e, [field]: newValue}));
  };
    
  return (isEditing) ? (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        borderRadius: '4px',
        padding: '0px 2px',
      }}>

      <input
        type="text"
        value={values[field]}
        onChange={(e) => handleFieldChange(field, e.target.value)}
        onBlur={handleBlur}
        autoFocus
        style={{
          outline: 'none',
          border: 'none',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          width: `${values[field].length}ch`,
        }}
      />
      <button
        onClick={handleBlur}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          color: 'black',
          padding: '3px',
          marginLeft: '5px',
        }}
        className="edit-icon">
        X
      </button>
    </div>
  ) : (
    <span
      className={`flex w-[${values[field].length}ch]`}
      onClick={() => {
        console.log('click')
        setIsEditing(true);}}
      style={{ cursor: 'pointer', color: '#d01884' }}>
      {values[field]} <span className="edit-icon ml-2 flex"><Editicon /></span>
    </span>
  );
};

export default DynamicInput;
