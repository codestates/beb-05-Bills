import styles from '../pages/style/ProductCard.module.css';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import {useSelector} from 'react-redux'

const ProductCard = () => {

  const { me } = useSelector((state) => state.user);
  const buyCouponClick = async (discount)=>{
    console.log("call")
    console.log(me)
    await fetch(`http://localhost:3065/coupon/buy/${discount}`, {
        method: 'POST', // 또는 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(me),
        })
        .then((response) => response.json())
        .then((el) => {
        })
        .catch((error) => {
        });
      }

  return (
    <>
    <Head>
      <title>게시글 작성</title>
    </Head>
    <AppLayout>
      <div className={styles}>
        <img src="https://cdn.pixabay.com/photo/2015/12/03/14/53/cinema-ticket-1075066_960_720.png" height="300" width="413"/>
        <h4 className={styles.title}>1% 할인</h4>
        <button className={styles.button} onClick={()=>{buyCouponClick(1)}}>구매하기</button>
      </div>
      <div className={styles}>
        <img src="https://cdn.pixabay.com/photo/2015/12/03/14/53/cinema-ticket-1075066_960_720.png" height="300" width="413" />
        <h4 className={styles.title}>2% 할인</h4>
        <button className={styles.button}  onClick={()=>{buyCouponClick(2)}}>구매하기</button>
      </div>
      <div className={styles}>
        <img src="https://cdn.pixabay.com/photo/2015/12/03/14/53/cinema-ticket-1075066_960_720.png" height="300" width="413" />
        <h4 className={styles.title}>3% 할인</h4>
        <button className={styles.button} onClick={()=>{buyCouponClick(3)}}>구매하기</button>
      </div>
      <div className={styles}>
        <img src="https://cdn.pixabay.com/photo/2015/12/03/14/53/cinema-ticket-1075066_960_720.png" height="300" width="413" />
        <h4 className={styles.title}>5% 할인</h4>
        <button className={styles.button} onClick={()=>{buyCouponClick(5)}}>구매하기</button>
      </div>
      <div className={styles}>
        <img src="https://cdn.pixabay.com/photo/2015/12/03/14/53/cinema-ticket-1075066_960_720.png" height="300" width="413" />
        <h4 className={styles.title}>10% 할인</h4>
        <button className={styles.button} onClick={()=>{buyCouponClick(10)}}>구매하기</button>
      </div>
    </AppLayout>
  </>
  );
};

export default ProductCard;