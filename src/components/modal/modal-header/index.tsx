import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import cn from 'classnames';

interface P {
  title?: string;
  onClose: () => void;
}

const ModalHeader = (props: P) => {
  const { title, onClose } = props;
  return (
    <div className={cn(styles.header, 'pt-5 pb-5')}>
      {title && <h5>{title}</h5>}
      <p className={styles.close} onClick={() => onClose()}>
        <CloseIcon type="primary" />
      </p>
    </div>
  );
};

export default ModalHeader;
