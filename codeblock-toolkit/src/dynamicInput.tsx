import React from 'react';
import Editicon from './icons/Edit.icon';


interface EditableFieldProps {
  value: string | string[];
  field: 'subnetName' | 'range' | 'networkName' | 'region';
  isEditing: boolean;
  onEdit: (field:  'subnetName' | 'range' | 'networkName' | 'region') => void;
  onChange: (field:  'subnetName' | 'range' | 'networkName' | 'region', newValue: string) => void;
  onBlur: () => void;
  onCancel: () => void;
}

const DynamicInput: React.FC<EditableFieldProps> = ({
  value,
  field,
  isEditing,
  onEdit,
  onChange,
  onBlur,
  onCancel,
}) => {
    
  return isEditing ? (
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
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        onBlur={onBlur}
        autoFocus
        style={{
          outline: 'none',
          border: 'none',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          width: `${value.length}ch`,
        }}
      />
      <button
        onClick={onCancel}
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
      className={`flex w-[${value.length}ch]`}
      onClick={() => onEdit(field)}
      style={{ cursor: 'pointer', color: '#d01884' }}>
      {value} <span className="edit-icon ml-2 flex"><Editicon /></span>
    </span>
  );
};

export default DynamicInput;
