import styles from './style.module.css';

interface IProps {
  onClose(): void;
}

const ModalBackDrop = ({ onClose }: IProps) => {
  return <div onClick={onClose} className={styles.backdrop}></div>;
};

export default ModalBackDrop;
