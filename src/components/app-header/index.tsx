import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import HeaderItem from './header-item';

import styles from './style.module.css';

const AppHeader = () => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <header className="AppHeader pt-4 pb-4">
      <ul className={styles.container}>
        <HeaderItem text="Конструктор" Icon={BurgerIcon} isActive={true} />
        <HeaderItem text="Лента заказов" Icon={ListIcon} isActive={isActive} />
        <Logo />
        <HeaderItem text="Личный кабинет" Icon={ProfileIcon} isActive={isActive} />
      </ul>
    </header>
  );
};

export default AppHeader;
