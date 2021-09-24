import styles from './spinner.module.css'

const Spinner = () => {
    return (
        <div className={styles["preloader"]}>
            <div className={styles['preloader__container']}>
                <span className={styles['preloader__round']}></span>
            </div>
        </div>
    )
};

export default Spinner;