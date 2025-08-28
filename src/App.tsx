import React from 'react';
import AppRoutes from './routes';
import { NotificationProvider } from './controllers/useNotiProviderController';
import NotificationModal from './components/NotificationModal';

function App() {
  return (
    <NotificationProvider>
      <AppRoutes />
      <NotificationModal />
    </NotificationProvider>
  );
}

export default App; 