import React from 'react';
import AppRoutes from './routes';
import {AuthProvider} from './contexts/AuthContext';
import NotificationModal from './components/notification-modal';
import {NotificationProvider} from "./controllers/useNotiProviderController";

function App() {
    return (
        <AuthProvider>
            <NotificationProvider>
                <AppRoutes/>
                <NotificationModal/>
            </NotificationProvider>
        </AuthProvider>
    );
}

export default App; 