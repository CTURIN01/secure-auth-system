import React from 'react'

const Button = ({ children, className = '', variant = 'default', ...props }) => {
  const baseStyles = {
    padding: 'var(--button-padding)',
    borderRadius: 'var(--border-radius)',
    fontWeight: '600',
    transition: 'background-color 0.2s, color 0.2s',
    outline: 'none',
  }
  
  const variantStyles = {
    default: {
      backgroundColor: 'var(--primary-color)',
      color: '#ffffff',
    },
    outline: {
      backgroundColor: 'transparent',
      border: '2px solid var(--primary-color)',
      color: 'var(--primary-color)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--primary-color)',
    },
  }

  return (
    <button 
      className={`button ${variant} ${className}`}
      style={{...baseStyles, ...variantStyles[variant]}}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button }