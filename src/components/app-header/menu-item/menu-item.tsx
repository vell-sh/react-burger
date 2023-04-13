import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import cn from 'classnames';

import styles from './style.module.css';
import { NavLink } from 'react-router-dom';

type IProps = {
  url: string;
  Icon: ({ type }: TIconProps) => JSX.Element;
  text: string;
};

const MenuItem = ({ url, Icon, text }: IProps) => {
  return (
    <NavLink to={url} className={isActive => cn(isActive ? 'primary' : 'secondary', styles.link)}>
      {({ isActive }) => (
        <div className={cn(styles.item, isActive && styles.item_active, 'pt-4 pb-4 pl-5 pr-5')}>
          <div className="mr-2">
            <Icon type={isActive ? 'primary' : 'secondary'} />
          </div>
          <span>{text}</span>
        </div>
      )}
    </NavLink>
  );
};

export default MenuItem;

const defaultProps = {
  url: '/',
};

MenuItem.defaultProps = defaultProps;
