import cn from 'classnames';
import styles from './style.module.css';

interface IProps {
  name: string;
  value: number;
}

const InformationElement = ({ name, value }: IProps) => {
  return (
    <div className={cn(styles.info, 'mr-5')}>
      <span className="pb-2">{name}</span>
      <span>{value}</span>
    </div>
  );
};

export default InformationElement;
