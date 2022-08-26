import styles from '../pages/style/ProductCard.module.css';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

const ProductCard = () => {

  
  return (
    <>
    <Head>
      <title>게시글 작성</title>
    </Head>
    <AppLayout>
      <div className={styles}>
        <img src="https://cdn.pixabay.com/photo/2015/12/03/14/53/cinema-ticket-1075066_960_720.png" height="300" width="413"/>
        <h4 className={styles.title}>1% 할인</h4>
        <button className={styles.button}>구매하기</button>
      </div>
      <div className={styles}>
        <img src="https://cdn.pixabay.com/photo/2015/12/03/14/53/cinema-ticket-1075066_960_720.png" height="300" width="413" />
        <h4 className={styles.title}>2% 할인</h4>
        <button className={styles.button}>구매하기</button>
      </div>
      <div className={styles}>
        <img src="https://cdn.pixabay.com/photo/2015/12/03/14/53/cinema-ticket-1075066_960_720.png" height="300" width="413" />
        <h4 className={styles.title}>3% 할인</h4>
        <button className={styles.button}>구매하기</button>
      </div>
      <div className={styles}>
        <img src="https://cdn.pixabay.com/photo/2015/12/03/14/53/cinema-ticket-1075066_960_720.png" height="300" width="413" />
        <h4 className={styles.title}>5% 할인</h4>
        <button className={styles.button}>구매하기</button>
      </div>
      <div className={styles}>
        <img src="https://cdn.pixabay.com/photo/2015/12/03/14/53/cinema-ticket-1075066_960_720.png" height="300" width="413" />
        <h4 className={styles.title}>10% 할인</h4>
        <button className={styles.button}>구매하기</button>
      </div>
    </AppLayout>
  </>
  );
};

export default ProductCard;