import styles from './style.module.css';

interface IProps {
  onClose(): void;
}

const ModalOverlay = ({ onClose }: IProps) => {
  return <div onClick={onClose} className={styles.backdrop}></div>;
};

export default ModalOverlay;
