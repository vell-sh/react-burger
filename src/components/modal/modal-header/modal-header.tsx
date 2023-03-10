import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

import styles from './style.module.css';

interface P {
  title?: string;
  onClose: () => void;
}

const ModalHeader = (props: P) => {
  const { title, onClose } = props;
  return (
    <div className={cn(styles.header, 'pt-5 pb-5')}>
      {title && <h3 className="text text_type_main-large">{title}</h3>}
      <p className={styles.close} onClick={() => onClose()}>
        <CloseIcon type="primary" />
      </p>
    </div>
  );
};

export default ModalHeader;
