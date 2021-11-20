import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/** Toast context / custom hooks */
import { useToast, useToastUpdate } from '../contexts/ToastContext';

const Toast: React.FC = () => {
  const toastMsg: string = useToast();
  const toastUpdate: (newMsg: string) => void = useToastUpdate();

  useEffect(() => {
    toastMsg && showNotification(toastMsg);
    /** Set msg immediately empty, so next prop changes trigger toast,
     even if toast message is same as previous */
    toastUpdate('');
  });

  const showNotification = (message: string) =>
    toast.info(message, { style: { border: '1px solid white' } });

  return (
    <ToastContainer
      autoClose={3000}
      closeOnClick
      draggable={false}
      hideProgressBar
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      position={'bottom-center'}
      rtl={false}
      theme={'dark'}
    />
  );
};

export default Toast;
