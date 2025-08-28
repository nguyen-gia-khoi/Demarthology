import React from 'react';
import AppRoutes from './routes';
import { NotificationProvider } from './controllers/NotificationController';
import NotificationModal from './components/notification-modal';
function App() {
  return (
    <NotificationProvider>
      <AppRoutes />
      <NotificationModal />
    </NotificationProvider>
  );
}

export default App; 