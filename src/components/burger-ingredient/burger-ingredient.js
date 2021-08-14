import styles from './burger-ingredient.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredient = ({data}) => {
    const {name, price, image} = data;
    
    return (
        <li className={styles.card}>
            <img className={styles.image} alt={`${name}`} src={image} />
            <div className={styles.price}>
                <span className={`text text_type_main-medium ${styles.money}`}>
                    {price}
                </span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-small ${styles.name}`}>
                {name}
            </p>
        </li>
    );
}

// {
//     "_id":"60666c42cc7b410027a1a9b2",
//     "name":"Флюоресцентная булка R2-D3",
//     "type":"bun",
//     "proteins":44,
//     "fat":26,
//     "carbohydrates":85,
//     "calories":643,
//     "price":988,
//     "image":"https://code.s3.yandex.net/react/code/bun-01.png",
//     "image_mobile":"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
//     "image_large":"https://code.s3.yandex.net/react/code/bun-01-large.png",
//     "__v":0
//  }

export default BurgerIngredient;