import React from 'react';
import './styles/FormInput.css'

export const FormInput = ({ 
  field, 
  fieldLabel, 
  value, 
  handleChange,
}) => {
  return (
    <div className="form-input">
      <label 
        htmlFor={field} 
        className="field-label"
      >
        {fieldLabel}
      </label>
      <input 
        type="text"
        className="input-field"
        name={field}
        value={value}
        onChange={handleChange}
      />
    </div>
    )
}