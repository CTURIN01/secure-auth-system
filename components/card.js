import React from 'react'

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`card ${className}`}
      style={{
        backgroundColor: 'var(--card-bg-color)',
        boxShadow: 'var(--card-shadow)',
        borderRadius: 'var(--border-radius)',
        padding: '1.5rem',
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-header ${className}`} style={{ marginBottom: '1rem' }} {...props}>
      {children}
    </div>
  )
}

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h2 className={`card-title ${className}`} style={{ fontSize: '1.5rem', fontWeight: 'bold' }} {...props}>
      {children}
    </h2>
  )
}

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`card-content ${className}`} {...props}>
      {children}
    </div>
  )
}

export { Card }