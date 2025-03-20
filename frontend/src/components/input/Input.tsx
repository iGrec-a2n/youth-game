

import React, { useState , forwardRef} from 'react';

type InputTextProps = {
  name: string;
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ placeholder, name, type , value, onChange, required }, ref) => {
    return (
      <input 
        ref={ref} // 🔹 Ajout de la ref pour react-hook-form
        placeholder={placeholder} 
        name={name} 
        type={type} 
        value={value} 
        onChange={onChange} 
        required={required} 
      />
    );
  }
);


type inputPasswordProps = {
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export const InputPassword = forwardRef<HTMLInputElement, inputPasswordProps>(
  ({ placeholder, name, value, onChange, required }, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <InputText
      ref={ref}
        name={name}
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        required={required}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        style={{ marginRight: '8px', cursor: 'pointer',position:'absolute',right:'0', background:'none',border:'none' }}
      >
        {showPassword ? '🙈' : '👁️'}
      </button>
    </div>
  );
});

