import React, { createContext, useContext, useState, ReactNode } from 'react';
import { type Notification } from '../data';

interface NotificationContextType {
  selectedNotification: Notification | null;
  showModal: boolean;
  handleNotificationClick: (notification: Notification) => void;
  handleCloseModal: () => void;
  handleModalBackdropClick: (e: React.MouseEvent) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNotification(null);
  };

  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const value: NotificationContextType = {
    selectedNotification,
    showModal,
    handleNotificationClick,
    handleCloseModal,
    handleModalBackdropClick,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
