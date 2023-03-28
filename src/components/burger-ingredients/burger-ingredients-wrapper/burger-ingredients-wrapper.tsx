import cn from 'classnames';
import { RefObject } from 'react';

import styles from './style.module.css';

interface IProps {
  title: string;
  children: React.ReactNode;
  innerRef: RefObject<HTMLDivElement>;
}

const BurgerIngredientsWrapper = (props: IProps) => {
  return (
    <div ref={props.innerRef}>
      <h2>{props.title}</h2>
      <div className={cn(styles.wrapper, 'pl-4 pr-4 pt-6')}>{props.children}</div>
    </div>
  );
};

export default BurgerIngredientsWrapper;
