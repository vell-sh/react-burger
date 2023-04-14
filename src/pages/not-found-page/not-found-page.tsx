import cn from 'classnames';
import styles from './styles.module.css';
import logo from '../../images/logo.svg';

const NotFoundPage = () => {
  return (
    <div className={styles.main}>
      <h1 className={cn('text text_type_main-large pt-30 mb-10', styles.title)}>Страница не найдена</h1>
      <img className={styles.image} src={logo} alt="Логотип" />
    </div>
  );
};

export default NotFoundPage;
