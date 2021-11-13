import React, { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CSS from 'csstype';

const successStyles: CSS.Properties = {
  backgroundColor: 'black',
  border: '1px solid whitesmoke',
  color: 'whitesmoke'
};

const errorStyles: CSS.Properties = {
  backgroundColor: 'black',
  border: '1px solid whitesmoke',
  color: 'whitesmoke'
};

interface Props {
  msg: string;
  type: 'error' | 'success';
}

const Toast: React.FC<Props> = ({ msg, type }: Props) => {
  useEffect(() => {
    if (msg) {
      switch (type) {
        case 'success':
          successNotification(msg);
          break;

        case 'error':
          errorNotification(msg);
          break;

        default:
          break;
      }
    }
  });

  const successNotification = (message: string) =>
    toast.success(message, {
      position: 'bottom-center',
      autoClose: 3000,
      className: 'toast-success',
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      style: successStyles
    });

  const errorNotification = (message: string) =>
    toast.error(message, {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      style: errorStyles
    });

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Toast;
