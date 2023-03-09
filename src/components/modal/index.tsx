import ReactDOM from 'react-dom';
import ModalBackDrop from './modal-backdrop';
import ModalHeader from './modal-header';
import cn from 'classnames';
import styles from './style.module.css';

const modalRoot = document.getElementById('react-modals');

interface IProps {
  children: React.ReactNode;
  title?: string;
  isVisible: boolean;
  onClose(): void;
}

const Modal = (props: IProps) => {
  const { children, title, onClose, isVisible } = props;
  const modalClassName = cn(
    styles.modal,
    isVisible && styles.modalVisible,
    'pl-10 pt-10 pr-10 pb-10'
  );
  return ReactDOM.createPortal(
    <>
      <div className={modalClassName}>
        <div className={styles.dialog}>
          <ModalHeader title={title} onClose={onClose} />
          {children}
        </div>
      </div>
      <ModalBackDrop onClose={onClose} />
    </>,
    modalRoot!
  );
};

const defaultProps = {
  visible: false,
};
Modal.defaultProps = defaultProps;

export default Modal;
