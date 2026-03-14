import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: '#0A0D1A' }}
        >
          <div className="text-center px-6">
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '32px',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Une erreur est survenue
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '24px',
              }}
            >
              Veuillez rafraîchir la page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
              style={{
                padding: '14px 32px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Rafraîchir
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
