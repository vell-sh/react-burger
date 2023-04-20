import React from 'react';
import { Oval } from 'react-loader-spinner';
import styles from './styles.module.css';

const Loader = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.loader}>
        <Oval
          height={120}
          width={120}
          color="#4C4CFF"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#8585AD"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      </div>
    </div>
  );
};

export default Loader;
