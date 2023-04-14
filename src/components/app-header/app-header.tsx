import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import MenuItem from './menu-item/menu-item';
import cn from 'classnames';
import HeaderItem from './header-item/header-item';

import styles from './style.module.css';

const AppHeader = () => {
  return (
    <header className={cn('pt-4 pb-4', styles.main)}>
      <nav className="container">
        <ul className={styles.wrapper}>
          <HeaderItem>
            <MenuItem text="Конструктор" url="/" Icon={BurgerIcon} />
          </HeaderItem>
          <HeaderItem>
            <MenuItem text="Лента заказов" url="/profile/orders" Icon={ListIcon} />
          </HeaderItem>
          <HeaderItem className={styles.logo}>
            <Logo />
          </HeaderItem>
          <HeaderItem className={styles.lastItem}>
            <MenuItem text="Личный кабинет" url="/profile" Icon={ProfileIcon} />
          </HeaderItem>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
