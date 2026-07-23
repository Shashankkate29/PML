import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  hoverEffect = true, 
  className = '', 
  style, 
  ...props 
}) => {
  const cardStyle = {
    padding: '30px',
    transition: 'var(--transition-bounce)',
    willChange: 'transform',
    ...style
  };

  return (
    <div 
      className={`glass-container ${hoverEffect ? 'glass-hover' : ''} ${className}`}
      style={cardStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
