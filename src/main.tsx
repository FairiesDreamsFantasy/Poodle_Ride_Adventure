import React, { StrictMode, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './index.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Poodle Ride Adventure] Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleCleanReload = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.clear();
        sessionStorage.clear();
        if ('caches' in window) {
          caches.keys().then((keys) => {
            return Promise.all(keys.map((k) => caches.delete(k)));
          }).then(() => {
            window.location.reload();
          });
          return;
        }
      } catch (e) {
        console.warn('Storage reset warning:', e);
      }
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#050505',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '560px',
            width: '100%',
            backgroundColor: '#18181b',
            border: '1px solid #ef4444',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.6)'
          }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f87171', marginBottom: '8px' }}>
              Poodle Ride Adventure — System Recovery
            </h1>
            <p style={{ color: '#d4d4d8', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>
              A rendering exception occurred. Click the button below to purge cached browser state and reload the game cleanly.
            </p>
            {this.state.error && (
              <pre style={{
                backgroundColor: '#09090b',
                color: '#fca5a5',
                padding: '12px',
                borderRadius: '6px',
                fontSize: '12px',
                overflowX: 'auto',
                marginBottom: '16px'
              }}>
                {this.state.error.message || String(this.state.error)}
              </pre>
            )}
            <button
              onClick={this.handleCleanReload}
              style={{
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontWeight: '600',
                padding: '10px 18px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Clear Cache &amp; Reload Game
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}

// Service Worker Registration with Auto-Update and Cache Refresh
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${(import.meta as any).env.BASE_URL}sw.js`, { updateViaCache: 'none' })
      .then((registration) => {
        registration.update();
      })
      .catch((err) => {
        console.warn('SW registration skipped:', err);
      });
  });
}
