import cn from 'classnames';

import styles from './style.module.css';

type P = {
  className?: string;
  children: React.ReactNode;
};

const HeaderItem = (props: P) => {
  return <li className={cn(props.className, styles.item)}>{props.children}</li>;
};

export default HeaderItem;
