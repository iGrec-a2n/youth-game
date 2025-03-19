import React from 'react'
import './ButtonDecline.scss';

interface ButtonProps {

    type: 'primary' | 'secondary' | 'tertiary';
    label: string;

    className?: string;
    disabled?: boolean;

}

export const ButtonDecline: React.FC<ButtonProps> = ({ label, className, type, disabled }) => {

    return (
        <button className={`button-style ${className}  ${type}`} disabled={disabled}>
            {label}
        </button>
    )
}
