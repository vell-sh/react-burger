import cn from 'classnames';

import styles from './style.module.css';

type IProps = {
  className?: string;
  children: React.ReactNode;
};

const HeaderItem = ({ className, children }: IProps) => {
  return <li className={cn(className, styles.item)}>{children}</li>;
};

export default HeaderItem;
