import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import cn from 'classnames';
import styles from './style.module.css';

type P = {
  className?: string;
  url?: string;
  Icon: ({ type }: TIconProps) => JSX.Element;
  text: string;
  isActive: boolean;
};

const MenuItem = ({ url, Icon, text, isActive }: P) => {
  return (
    <div className={cn(styles.item, isActive && styles.item_active, 'pt-4 pb-4 pl-5 pr-5')}>
      <a className={styles.link} href={url}>
        <div className="mr-2">
          <Icon type={isActive ? 'primary' : 'secondary'} />
        </div>
        <span>{text}</span>
      </a>
    </div>
  );
};

export default MenuItem;

const defaultProps = {
  url: '/',
  isActive: false,
};

MenuItem.defaultProps = defaultProps;
