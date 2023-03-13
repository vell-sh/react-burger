import cn from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import ModalHeader from './modal-header/modal-header';
import ModalOverlay from './modal-overlay/modal-overlay';

import styles from './style.module.css';

const modalRoot = document.getElementById('react-modals');

interface IProps {
  children: React.ReactNode;
  onClose(): void;
  title?: string;
}

const Modal = (props: IProps) => {
  const { children, title, onClose } = props;

  const modalClassName = cn(styles.modal, 'pl-10 pt-10 pr-10 pb-10');

  const handleEscKey = () => {
    onClose();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscKey, false);

    return () => {
      document.removeEventListener('keydown', handleEscKey, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={modalClassName}>
        <div className={styles.dialog}>
          <ModalHeader title={title} onClose={onClose} />
          {children}
        </div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot!
  );
};

export default Modal;
