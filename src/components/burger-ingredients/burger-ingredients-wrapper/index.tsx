import cn from 'classnames';

import styles from './style.module.css';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const BurgerIngredientsWrapper = (props: IProps) => {
  return (
    <>
      <h2>{props.title}</h2>
      <div className={cn(styles.wrapper, 'pl-4 pr-4 pt-6')}>{props.children}</div>
    </>
  );
};

export default BurgerIngredientsWrapper;
