import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  msg: string;
}

const Toast: React.FC<Props> = ({ msg }: Props) => {
  useEffect(() => {
    msg && showNotification(msg);
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
