import React, { createContext, useContext, ReactNode } from 'react';
import useNotification, { NotificationType } from '../hooks/useNotification';

interface NotificationContextProps {
  message: string;
  messageType: NotificationType;
  showNotification: boolean;
  showMessage: (msg: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const notification = useNotification();

  return <NotificationContext.Provider value={notification}>{children}</NotificationContext.Provider>;
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};
