import { useState } from 'react';

type MessageType = 'success' | 'error';

// TODO: 共通で使用するフローティングメッセージを作成する
const useNotification = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<MessageType>('success');
  const [showNotification, setShowNotification] = useState(false);

  const showMessage = (msg: string, type: MessageType) => {
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
