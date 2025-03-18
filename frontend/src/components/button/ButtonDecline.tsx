import React from 'react'
import './ButtonDecline.scss';

interface ButtonProps {

    type: 'primary' | 'secondary' | 'tertiary';
    label: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;

}

export const ButtonDecline: React.FC<ButtonProps> = ({ label, onClick, className, type, disabled }) => {

    return (
        <button className={`button-style ${className}  ${type}`} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    )
}
