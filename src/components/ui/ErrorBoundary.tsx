import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-6 py-2 rounded-full border"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
