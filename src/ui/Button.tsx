import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  let buttonClass = 'btn-primary';
  if (variant === 'secondary') {
    buttonClass = 'btn-secondary';
  } else if (variant === 'outline') {
    buttonClass = 'btn-secondary'; // Reuses outline/secondary styling
  }

  return (
    <button 
      className={`${buttonClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
