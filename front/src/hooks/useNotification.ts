import { useState } from 'react';

export type NotificationType = 'success' | 'error';

const useNotification = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<NotificationType>('success');
  const [showNotification, setShowNotification] = useState(false);

  const showMessage = (msg: string, type: NotificationType) => {
    setMessage(msg);
    setMessageType(type);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return { message, messageType, showNotification, showMessage };
};

export default useNotification;
