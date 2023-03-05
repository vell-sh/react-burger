import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import cl from 'classnames';
import styles from './style.module.css';

type P = {
  url?: string;
  Icon: ({ type }: TIconProps) => JSX.Element;
  text: string;
  isActive: boolean;
};

const HeaderItem = ({ url, Icon, text, isActive }: P) => {
  return (
    <li className={cl(styles.item, isActive && styles.item_active, 'pt-4 pb-4 pl-5 pr-5')}>
      <a className={styles.link} href={url}>
        <div className="mr-2">
          <Icon type={isActive ? 'primary' : 'secondary'} />
        </div>
        <span>{text}</span>
      </a>
    </li>
  );
};

export default HeaderItem;

const defaultProps = {
  url: '/',
  isActive: false,
};

HeaderItem.defaultProps = defaultProps;
