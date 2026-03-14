import { useState } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import SplashScreen from './components/SplashScreen';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <ErrorBoundary>
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
