// First, install react-hot-toast:
// npm install react-hot-toast

// Then add the Toaster component to your main App.jsx or root component:

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      {/* Your existing components */}
      
      {/* Add the Toaster component - it handles displaying all toasts */}
      <Toaster
        position="top-right"
        toastOptions={{
          // Default options for all toasts
          duration: 3000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.75rem',
            fontSize: '14px',
          },
          // Custom styling for different toast types
          success: {
            iconTheme: {
              primary: 'hsl(var(--primary))',
              secondary: 'hsl(var(--card))',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: 'hsl(var(--card))',
            },
          },
        }}
      />
    </div>
  );
}

export default App;