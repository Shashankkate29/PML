import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '3rem', color: '#C5A880', margin: '0 0 10px 0' }}>500</h1>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '500', margin: '0 0 20px 0' }}>Something went wrong.</h2>
          <p style={{ color: '#888', maxWidth: '500px', fontSize: '0.95rem', lineHeight: '1.5', margin: '0 0 30px 0' }}>
            We apologize for the inconvenience. A critical frontend execution error has occurred. Our engineers have been notified.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#C5A880',
              border: 'none',
              color: '#000',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#b0936b')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#C5A880')}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
