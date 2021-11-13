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
      position={'bottom-center'}
      autoClose={3000}
      draggable={false}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme={'dark'}
    />
  );
};

export default Toast;
