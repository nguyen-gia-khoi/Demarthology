import React from 'react';
import AppRoutes from './routes';
import NotificationModal from './components/notification-modal';
import { NotificationProvider } from "./controllers/useNotiProviderController";

function App() {
    return (
        <NotificationProvider>
            <AppRoutes/>
            <NotificationModal/>
        </NotificationProvider>
    );
}

export default App; 